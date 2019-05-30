// Should have the ability to listen to and fire events.

const events = (function() {
  console.log('Loading Events module...');
  // addEventListener('gb-plugin', (event) => {
  //   console.log(event.type);
  //   console.log(event.detail);
  // })
  return {
    name: 'events',
    description: 'Events module',
    testFunc: function(arg1, arg2, arg3) {
      console.log('In test func with args:', arg1, arg2, arg3);
    },
  }
})()

export default events
