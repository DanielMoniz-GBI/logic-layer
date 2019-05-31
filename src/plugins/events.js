// Should have the ability to listen to and fire events.

export default function(core) {
  console.log('Loading Events module...');
  // addEventListener('gb-plugin', (event) => {
  //   console.log(event.type);
  //   console.log(event.detail);
  // })
  return {
    name: 'events',
    description: 'Events module',
  }
}
