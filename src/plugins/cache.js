
export default function() {
  let cache = {}
  return {
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
