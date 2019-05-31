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
})()
