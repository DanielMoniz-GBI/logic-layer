// Should be able to provide products given a search term.
import axios from 'axios'
console.log(axios.get);

export default function(core) {
  console.log('Loading Search module...');
  return {
    name: 'search',
    description: 'Search module',
    testFunc: function(arg1, arg2, arg3) {
      console.log('In Search.testFunc');
    },
    search: function(searchTerm) {
      axios.get('https://s3.amazonaws.com/groupby-sample/mock-data.json')
        .then(function(response) {
          const products = response.data.filter(product => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase())
          })
          core.dispatch('cache', 'setQuery', [`search-${searchTerm}`])
        }).catch(function(error) {
          console.log(error);
        })
      // @TODO Need to notify core of successful search so it can fire an event.
    },
  }
}
