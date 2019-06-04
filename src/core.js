
export default function() {
  return {
    addPlugin: function(plugin) {
      this.plugins[plugin.name] = plugin
      console.log('Plugin added:', plugin.name)
    },
    dispatch: function(pluginName, methodName, passedArgs) {
      console.log(`Core - dispatching: ${pluginName}, ${methodName}`)
      const plugin = this.plugins[pluginName]
      if (plugin === undefined) {
        console.warn(`Plugin ${pluginName} does not exist.`)
        return false
      }
      const func = plugin[methodName]
      if (func === undefined) {
        throw new Error(`Method ${methodName} does not exist in plugin ${pluginName}.`)
      }
      if (typeof func !== 'function') {
        throw new Error(`${methodName} in plugin ${pluginName} is not a method, but a ${typeof func}.`)
      }
      return func.apply(plugin, passedArgs)
    },
    plugins: {},
  }
}
