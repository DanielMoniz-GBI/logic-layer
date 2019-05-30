import core from './core'
import events from './plugins/events'

(function() {
  console.log(core);
  console.log('Core module loaded.');

  console.log(events);
  console.log('Events module loaded.');

  core.addPlugin(events)
  // test usage of core
  core.dispatch('events', 'testFunc', ['arg1', 'arg2', 'arg3'])
})()
