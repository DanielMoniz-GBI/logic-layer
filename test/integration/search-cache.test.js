const expect = require('chai').expect

const getCore = require('../../src/core').default
const getSearch = require('../../src/plugins/data-sources/search').default
const getCache = require('../../src/plugins/cache').default

describe('search with cache', () => {
  let core, cache, search
  beforeEach(() => {
    core = getCore()
    cache = getCache(core)
    search = getSearch(core)
    core.addPlugin(cache)
    core.addPlugin(search)
  })

  it('should cache a successful search', async () => {
    const result = await core.dispatch('search', 'search', ['beef'])
    const cachedSearch = cache.get('search-beef')
    expect(cachedSearch).to.be.an('Array')
    expect(cachedSearch.length).to.be.greaterThan(0)
  })

  it('should use a cached search if a matching one is present', async () => {
    const sampleResults = [1, 2, 3]
    core.dispatch('cache', 'set', ['search-beef', sampleResults])
    const result = await core.dispatch('search', 'search', ['beef'])
    expect(result).to.deep.equal(sampleResults)
  })
})
