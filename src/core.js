
export default function() {
  console.log('Loading Core module...');
  const plugins = {}
  return {
    addPlugin: function(plugin) {
      this.plugins[plugin.name] = plugin
      console.log('Plugin added:', plugin.name);
    },
    dispatch: function(pluginName, methodName, passedArgs) {
      console.log(`Core - dispatching: ${pluginName}, ${methodName}`);
      const plugin = this.plugins[pluginName]
      if (plugin === undefined) {
        return `Plugin ${pluginName} does not exist.`
      }
      const func = plugin[methodName]
      if (func === undefined) {
        return `Method ${methodName} does not exist in plugin ${pluginName}.`
      }
      if (typeof func !== 'function') {
        return `${methodName} in plugin ${pluginName} is not a method, but a ${typeof func}.`
      }
      return func.apply(plugin, passedArgs)
    },
    plugins: {},
  }
}
