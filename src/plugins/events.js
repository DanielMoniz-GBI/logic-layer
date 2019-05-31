// Should have the ability to listen to and fire events.

// addEventListener('gb-plugin', (event) => {
//   console.log(event.type);
//   console.log(event.detail);
// })

export default function() {
  return {
    name: 'events',
    description: 'Allows other plugins to fire and listen for events.',
  }
}
