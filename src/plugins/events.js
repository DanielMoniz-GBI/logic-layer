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
      emitter.emit(type, 'test1', 'test2')
    },
    // @TODO Allow for clearing all listeners?
  }
}
