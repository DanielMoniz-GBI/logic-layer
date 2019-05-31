const core = require('../src/core')
const getSearch = require('../src/plugins/data-sources/search').default
const chai = require('chai')
const expect = chai.expect

describe('search module', () => {
  let search
  beforeEach(() => {
    search = getSearch(core)
  })

  describe('search', () => {
    it('should have a name', () => {
      expect(search.name).to.equal('search')
    })
  })
})
