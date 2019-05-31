const core = require('../src/core')
const getSearch = require('../src/plugins/data-sources/search').default
const chai = require('chai')
const expect = chai.expect

describe('search module', () => {
  let search
  beforeEach(() => {
    search = getSearch(core)
  })

  describe('contract', () => {
    it('should have a name', () => {
      expect(search.name).to.equal('search')
    })

    it('should have a description', () => {
      expect(typeof search.description).to.be.a('string')
      expect(search.description.length).to.be.greaterThan(0)
    })
  })

  describe('search', () => {
    it('should exist', () => {
      expect(search.search).to.be.a('function')
    })
  })
})
