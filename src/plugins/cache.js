
export default function() {
  let cache = {}
  return {
    name: 'cache',
    description: 'This module is a simple cache for (say) storing query results.',
    get: function(key) {
      return cache[key]
    },
    set: function(key, value) {
      cache[key] = value
    },
    clear: function() {
      cache = {}
    }
  }
}
