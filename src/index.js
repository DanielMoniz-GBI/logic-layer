import core from './core'
import events from './plugins/events'
import search from './plugins/data-sources/search'

(function() {
  console.log(core);
  console.log('Core module loaded.');

  console.log(events);
  console.log('Events module loaded.');

  console.log(search);
  console.log('Search module loaded.');

  core.addPlugin(events)
  core.addPlugin(search)

  // test usage of core -----

  // should succeed
  core.dispatch('events', 'testFunc', ['arg1', 'arg2', 'arg3'])
  core.dispatch('search', 'testFunc', ['arg1', 'arg2'])
  //should fail
  core.dispatch('asdf', 'testFunc')
  core.dispatch('search', 'asdfsfgj')
  core.dispatch('events', 'asdfsfgj')
})()
