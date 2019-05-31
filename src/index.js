import getCore from './core'
import getEvents from './plugins/events'
import getSearch from './plugins/data-sources/search'

(function() {
  const core = getCore()
  console.log(core);
  console.log('Core module loaded.');

  const events = getEvents(core)
  console.log(events);
  console.log('Events module loaded.');

  const search = getSearch(core);
  console.log(search);
  console.log('Search module loaded.');

  core.addPlugin(events)
  core.addPlugin(search)

  // test usage of core -----

  // should succeed
  core.dispatch('events', 'testFunc', ['arg1', 'arg2', 'arg3']) // through core
  events.testFunc('arg1', 'arg2', 'arg3') // direct usage
  core.dispatch('search', 'testFunc', ['arg1', 'arg2']) // through core
  search.testFunc('arg1', 'arg2') // direct usage
  //should fail
  core.dispatch('asdf', 'testFunc')
  core.dispatch('search', 'asdfsfgj')
  core.dispatch('events', 'asdfsfgj')

  core.dispatch('search', 'search', ['beef'])
})()
