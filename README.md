
# Logic Layer (prototype)

The purpose of this prototype is to determine potential strategies we could use for the Logic Layer portion of SF-X, as well as discovering potential issues in advance.

## Running the project

Run:

* `npm run watch` to build the application and to auto-rebuild after any app changes.
* `npm start` to run the server

Then visit http://localhost:8080/client-example/ to run the application in the browser.


## Testing

Tests exist for both node environments and the browser. Options:

* `npm test` --> run tests against all node tests (most tests by default)
* `npm run test:watch` --> run tests as above, but re-run when changes are made
* `npm run test:browser` --> run any browser-specific tests in a number of browser environments
* `npm run test:browser:all` --> run browser tests against all relevant browsers (including IE). NOTE: This will error if your machine does not have IE installed.
* `npm run test:all` --> run all node and browser tests in that order. Will fail on the first set that has failing tests.

## Findings

I succeeded in accomplishing my goals with this prototype. The most difficult part was the build process - not the actual code. My unit tests do not contain mocks due to these issues and are therefore limited.

### Strategy

The first assumption was that it needed to run in node, and so this project started without any browser-specific implementation. Axios (used in the Search plugin) was the first package I used that I was concerned might not work in both browser and node, but it does.

The first issue came with listening to and emitting events, which works differently in these environments. I therefore created a second browser-specific _Events_ plugin and a separate entry point for browsers so that the correct plugins could be registered in _Core_.

Lastly, I pulled in an existing prototype of Search and Sayt web components, and they worked with only minimal modification to the existing codebase.

### Key learnings

* We can have multiple representations of the same plugin to ensure that plugin works in both node and the browser.
  * This requires a separate entry point for webpack, which produces a distinct build.
* We can run tests separately against the browser-based plugins in browser environments using Karma.
  * We can distinguish what test files should be run by Karma by having the extension (for example) `.test.browser.js`.
  * All test files are otherwise assumed to be run using Mocha and Chai.
* In cases where we have multiple representations of the same module, we can/should make that clear by naming convention.
  * In this case, see `events-browser.js` versus `events-node.js`.
  * In other cases, we can leave out special naming and assume it works in both (as with `cache.js`).
* If web components and the logic layer are built to communicate via events, development can happen separately.

Caveats:
* The unit tests are not discovered when running on Windows.
* As of 2019-06-05, the browser does not successfully run the project in Windows. It redirects to add many trailing slashes (ie. `/client-example////`).
* I failed to create a build process that allowed for my unit tests to import third party libraries like `sinon`. I investigated this and moved on before solving it.
* I did not produce an example of sharing code between multiple representations of the same plugin. Ideally, `events-browser.js` and `events-node.js` can partially share code to minimize bugs.
* I did not produce an example of ensuring the same tests run on multiple representations of the same plugin where possible. For example, the tests from `events-browser.js` were copied from `events-node.js` (with different imports) rather than reused.

## The code: _Core_ plus plugins

### Core

_Core_ allows for registering plugins, and for having plugins (which can be provided access to _Core_) communicate with other plugins. This is important because each plugin should not know whether or not another plugin has been registered. Any (valid) attempt at communication must therefore fail silently.

Valid attempts at communication include attempting to message a method in another plugin that has not been registered. If the plugin has not been registered, it does not matter if the method is valid or not.

Invalid attempts at communication include attempting to message a plugin that has been registered, but:
* the method does not exist
* the name exists in the plugin's namespace, but it is not a method

Invalid communications will throw errors.

Core exposes the following methods:
* `addPlugin` --> register a plugin on core.
* `dispatch` --> attempt to communicate with another plugin.

### Plugins

All plugins have a `name`, `description`, and some number of publicly accessible methods.

#### Primary plugins

##### Cache

A simple key-value store. Currently this is only used for caching searches. It is not yet accessed in any way, but does correctly update after a search is made.

Cache exposes the following method:
* `get` --> get the data in the cache under a specific key.
* `set` --> set new data into the cache under a specific key.
* `clear` --> clear all key-value pairs in the cache.

##### Events

As with the other plugins, we require compatibility with both node and the browser. There are therefore actually two separate events plugins: `events-browser.js` and `events-node.js`. They are designed to function identically in different environments. The same tests can therefore be run on both, but must be run in different environments.

The Events modules exposes the following method:
* `listen` --> listen for a specific event and run the provided callback when it happens.
* `dispatch` --> dispatch a new event of the given type and with the provided payload. This payload will be included under the event object's `detail` attribute.


#### Data sources

##### Search

Search is a simple plugin that makes a web request against some mock product data. After completion, it attempts to:

* tell a cache plugin that it should cache the new results
* dispatch the event `gbi-search-complete` with the search term and the products to inform any listeners (including the View Layer) that there are new search results.

Search exposes the following methods:
* `search` --> perform a search against a sample web endpoint and emits an event on success.
* `getRecommendations` --> ask for product recommendations against a sample web endpoint and emits an event on success.
