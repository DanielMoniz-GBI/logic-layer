const expect = require('chai').expect

const getEvents = require('../src/plugins/events').default

describe('events', () => {
  let events
  beforeEach(() => {
    events = getEvents()
  })

  describe('contract', () => {
    it('should have a name', () => {
      expect(events.name).to.equal('events')
    })

    it('should have a description', () => {
      expect(typeof events.description).to.be.a('string')
      expect(events.description.length).to.be.greaterThan(0)
    })
  })

  describe('listen', () => {
    it('should be a function', () => {
      expect(events.listen).to.be.a('function')
    })

    it('should call the provided function after the relevant event type', () => {
      let eventCalled = false
      events.listen('test-event', () => eventCalled = true)

      expect(eventCalled).to.be.true
    })
  })
})