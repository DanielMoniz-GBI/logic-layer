// Should have the ability to listen to and fire events.

const events = (function() {
  console.log('Loading Events module...');
  const plugins = {}
  // addEventListener('gb-plugin', (event) => {
  //   console.log(event.type);
  //   console.log(event.detail);
  // })
  return {
    name: 'events',
    description: 'Events module',
    testFunc: function(arg1, arg2, arg3) {
      console.log('In test func with args: ---');
      console.log(arg1);
      console.log(arg2);
      console.log(arg3);
      console.log('---------------------------');
    },
  }
})()

export default events
