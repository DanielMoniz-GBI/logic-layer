// Should be able to provide products given a search term.
import axios from 'axios'

export default function(core) {
  return {
    name: 'search',
    description: 'Search module',
    search: function(searchTerm) {
      const searchKey = `search-${searchTerm}`
      const cachedResults = core.dispatch('cache', 'get', [searchKey])
      if (cachedResults) {
        return new Promise((resolve, _) => resolve(cachedResults))
      }

      return axios.get('https://s3.amazonaws.com/groupby-sample/mock-data.json')
        .then(function(response) {
          const products = response.data.filter(product => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase())
          }).slice(0, 12)
          core.dispatch('cache', 'set', [searchKey, products])
          core.dispatch('events', 'dispatch', [
            'gbi-search-complete',
            { searchTerm, products }
          ])
          return products
        }).catch(function(error) {
          console.log(error)
        })
    },
  }
}
