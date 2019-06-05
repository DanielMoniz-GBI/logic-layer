const chai = require('chai')
const expect = chai.expect

const getCore = require('../src/core').default
const getSearch = require('../src/plugins/data-sources/search').default

describe('search module', () => {
  const core = getCore()
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
