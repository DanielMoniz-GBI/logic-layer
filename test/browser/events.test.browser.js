import getEvents from '/base/src/plugins/events-browser.js'

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
      events.dispatch('test-event')
      expect(eventCalled).to.be.true
    })

    it('should receive an event object with a type and a detail payload', () => {
      const payload = { key1: 'val1', key2: 'val2' }
      events.listen('test-event', (event) => {
        expect(event.type).to.equal('test-event')
        expect(event.detail).to.deep.equal(payload)
      })
      events.dispatch('test-event', payload)
    })
  })
})
