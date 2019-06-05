
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

## Core

_Core_ allows for registering plugins, and for having plugins (which can be provided access to _Core_) communicate with other plugins. This is important because each plugin should not know whether or not another plugin has been registered. Any (valid) attempt at communication must therefore fail silently.

Valid attempts at communication include attempting to message a method in another plugin that has not been registered. If the plugin has not been registered, it does not matter if the method is valid or not.

Invalid attempts at communication include attempting to message a plugin that has been registered, but:
* the method does not exist
* the name exists in the plugin's namespace, but it is not a method

Invalid communications will throw errors.

Core exposes the following methods:
* `addPlugin` --> register a plugin on core.
* `dispatch` --> attempt to communicate with another plugin.

## Plugins

All plugins have a `name`, `description`, and some number of publicly accessible methods.

### Primary plugins

#### Cache

A simple key-value store. Currently this is only used for caching searches. It is not yet accessed in any way, but does correctly update after a search is made.

Cache exposes the following method:
* `get` --> get the data in the cache under a specific key.
* `set` --> set new data into the cache under a specific key.
* `clear` --> clear all key-value pairs in the cache.

#### Events

As with the other plugins, we require compatibility with both node and the browser. There are therefore actually two separate events plugins: `events-browser.js` and `events-node.js`. They are designed to function identically in different environments. The same tests can therefore be run on both, but must be run in different environments.

The Events modules exposes the following method:
* `listen` --> listen for a specific event and run the provided callback when it happens.
* `dispatch` --> dispatch a new event of the given type and with the provided payload. This payload will be included under the event object's `detail` attribute.


### Data sources

#### Search

Search is a simple plugin that makes a web request against some mock product data. After completion, it attempts to:

* tell a cache plugin that it should cache the new results
* dispatch the event `gbi-search-complete` with the search term and the products to inform any listeners (including the View Layer) that there are new search results.

Search exposes the following methods:
* `search` --> perform a search against a sample web endpoint and emits an event on success.
* `getRecommendations` --> ask for product recommendations against a sample web endpoint and emits an event on success.
