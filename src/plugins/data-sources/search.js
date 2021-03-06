// Should be able to provide products given a search term.
import axios from 'axios'

export default function(core) {
  const getProducts = function(searchTerm, quantity) {
    return axios.get('https://s3.amazonaws.com/groupby-sample/mock-data.json')
      .then(function(response) {
        const products = response.data.filter(product => {
          return product.name.toLowerCase().includes(searchTerm.toLowerCase())
        }).slice(0, quantity)
        return products
      }).catch(function(error) {
        console.log(error)
      })
  }

  const getCachedResults = function(searchKey) {
    return core.dispatch('cache', 'get', [searchKey]) || false
  }

  const sendSaytSuggestions = (products) => {
    core.dispatch('events', 'dispatch', [
      'gb-provide-sayt-suggestions',
      { products },
    ])
  }

  const sendSearchComplete = (searchTerm, products) => {
    core.dispatch('events', 'dispatch', [
      'gbi-search-complete',
      { searchTerm, products }
    ])
  }

  const getRecommendations = function(searchTerm, quantity=12) {
    const searchKey = `sayt-${searchTerm}`
    const cachedResults = getCachedResults(searchKey)
    if (cachedResults) {
      sendSaytSuggestions(cachedResults)
      return cachedResults
    }

    core.dispatch('events', 'dispatch', ['gbi-search-start'])

    return getProducts(searchTerm, quantity)
      .then((products) => {
        core.dispatch('cache', 'set', [searchKey, products])
        sendSearchComplete(searchTerm, products)
        sendSaytSuggestions(products)
      })
  }

  const search = function(searchTerm, quantity=24) {
    const searchKey = `search-${searchTerm}`
    const cachedResults = getCachedResults(searchKey)
    if (cachedResults) { return Promise.resolve(cachedResults) }

    core.dispatch('events', 'dispatch', ['gbi-search-start'])

    return getProducts(searchTerm, quantity)
      .then((products) => {
        core.dispatch('cache', 'set', [searchKey, products])
        sendSearchComplete(searchTerm, products)
      })
  }

  const listenForSayt = (event) => {
    return getRecommendations(event.detail.searchTerm, event.detail.quantity)
  }
  core.dispatch('events', 'listen', ['gb-request-sayt-suggestions', listenForSayt])

  return {
    name: 'search',
    description: 'Search module',
    getRecommendations,
    search,
  }
}
