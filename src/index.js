import getCore from './core'
import getEvents from './plugins/events'
import getCache from './plugins/cache'
import getSearch from './plugins/data-sources/search'

(function() {
  console.log('Setting up logic layer for node...')
  const core = getCore()
  const events = getEvents(core)
  const search = getSearch(core)
  const cache = getCache(core)

  core.addPlugin(events)
  core.addPlugin(search)
  core.addPlugin(cache)
  console.log('Logic layer ready for node.')

  search.search('beef')
  search.search('fis')
})()
