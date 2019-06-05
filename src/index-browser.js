import getCore from './core'
import getEvents from './plugins/events-browser'
import getCache from './plugins/cache'
import getSearch from './plugins/data-sources/search'

(function() {
  console.log('Setting up logic layer for browser...')
  const core = getCore()
  const events = getEvents(core)
  core.addPlugin(events)

  const search = getSearch(core)
  const cache = getCache(core)

  core.addPlugin(search)
  core.addPlugin(cache)
  console.log('Logic layer ready for browser.')

  if (window._gbi === undefined) {
    window._gbi = {
      core,
      events,
      search,
      cache,
    }
  }
})()
