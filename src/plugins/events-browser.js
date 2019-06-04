// Should have the ability to listen to and fire events.

export default function() {
  return {
    name: 'events',
    description: 'Allows other plugins to fire and listen for events.',
    listen: function(type, callback) {
      return addEventListener(type, callback)
    },
    dispatch: function(type, payload) {
      const event = new CustomEvent(type, { detail: payload })
      window.dispatchEvent(event)
    },
  }
}
