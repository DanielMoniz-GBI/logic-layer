const chai = require('chai')
const expect = chai.expect

const getCore = require('../src/core').default

describe('core', () => {
  let core
  beforeEach(() => {
    core = getCore()
  })

  describe('plugins', () => {
    it('should default to an empty collection', () => {
      expect(core.plugins).to.deep.equal({})
    })
  })

  describe('addPlugin', () => {
    it('should add a plugin to the collection by name', () => {
      const plugin = { name: 'test-plugin' }
      core.addPlugin(plugin)
      expect(core.plugins['test-plugin']).to.equal(plugin)
    })
  })

  describe('dispatch', () => {
    // beforeEach(() => {
    // })

    it('should return false if a plugin does not exist', () => {
      expect(core.dispatch('fake-plugin', 'some-method'))
        .to.equal(false)
    })

    it('should throw an error if plugin exist but method does not', () => {
      const plugin = { name: 'test-plugin' }
      core.addPlugin(plugin)
      expect(() => core.dispatch('test-plugin', 'bad-method-name'))
        .to.throw()
    })

    it('should throw an error if attribute in plugin is not a function', () => {
      const plugin = { name: 'test-plugin' }
      core.addPlugin(plugin)
      expect(() => core.dispatch('test-plugin', 'name'))
        .to.throw()
    })

    it('should call the named plugin method if it exists', () => {
      const plugin = {
        name: 'test-plugin',
        doTestThing: () => 'SUCCESS',
      }
      core.addPlugin(plugin)

      expect(core.dispatch('test-plugin', 'doTestThing'))
        .to.equal('SUCCESS')
    })

    it('should dispatch array arguments to the plugin method', () => {
      const plugin = {
        name: 'test-plugin',
        doTestThing: (arg1, arg2) => `${arg1}-and-${arg2}`,
      }
      core.addPlugin(plugin)

      expect(core.dispatch('test-plugin', 'doTestThing', ['tom', 'jerry']))
        .to.equal('tom-and-jerry')
    })
  })
})
