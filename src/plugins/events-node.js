import EventEmitter from 'events'

export default function() {
  const emitter = new EventEmitter()
  return {
    name: 'events',
    description: 'Allows other plugins to fire and listen for events.',
    listen: function(type, callback) {
      return emitter.on(type, callback)
    },
    dispatch: function(type, payload) {
      const event = {
        type,
        detail: payload,
      }
      emitter.emit(type, event)
    },
    // @TODO Allow for clearing all listeners?
  }
}
