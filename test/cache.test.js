const expect = require('chai').expect

const getCache = require('../src/plugins/cache').default

describe('cache', () => {
  let cache
  beforeEach(() => {
    cache = getCache()
  })

  describe('contract', () => {
    it('should have a name', () => {
      expect(cache.name).to.equal('cache')
    })

    it('should have a description', () => {
      expect(typeof cache.description).to.be.a('string')
      expect(cache.description.length).to.be.greaterThan(0)
    })
  })

  describe('get', () => {
    it('should return undefined if key does not exist in cache', () => {
      expect(cache.get('missing-key')).to.equal(undefined)
    })

    it('should return the value for a key if present in cache', () => {
      cache.set('key1', 'value1')
      expect(cache.get('key1')).to.equal('value1')
    })
  })

  describe('set', () => {
    it('should override a key/value pair if duplicate key is provided', () => {
      cache.set('key1', 'value1')
      expect(cache.get('key1')).to.equal('value1')
      cache.set('key1', 'value2')
      expect(cache.get('key1')).to.equal('value2')
    })

    it('can set complex values in the cache', () => {
      const testFunc = () => {}
      cache.set('key1', testFunc)
      expect(cache.get('key1')).to.equal(testFunc)
    })
  })

  describe('clear', () => {
    it('should have no effect on an empty cache', () => {
      expect(() => cache.clear())
        .to.not.throw()
    })

    it('should clear any key/value pairs in the cache', () => {
      cache.set('key1', 'value1')
      cache.set('key2', 'value2')
      expect(cache.get('key1')).to.equal('value1')
      expect(cache.get('key2')).to.equal('value2')
      cache.clear()
      expect(cache.get('key1')).to.equal(undefined)
      expect(cache.get('key2')).to.equal(undefined)
    })
  })
})
