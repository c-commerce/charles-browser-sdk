import {
  CHECKBOX,
  CURRENCYINPUT,
  DATE,
  DATERANGE,
  DATETIME,
  DATETIMERANGE,
  LARGETEXTINPUT,
  URL,
  MULTISELECT,
  NUMBERINPUT,
  NUMBERWITHUNITINPUT,
  PHONENUMBER,
  RADIO,
  SELECT,
  TEXTINPUT,
  TIME,
  TIMERANGE
} from '../../../src/entities/custom-property/inputs'

describe('Custom property: Inputs helper:', () => {
  it('implement serialize function', async () => {
    expect(CHECKBOX.serialize).toBeInstanceOf(Function)
    expect(CURRENCYINPUT.serialize).toBeInstanceOf(Function)
    expect(DATE.serialize).toBeInstanceOf(Function)
    expect(DATERANGE.serialize).toBeInstanceOf(Function)
    expect(DATETIMERANGE.serialize).toBeInstanceOf(Function)
    expect(DATETIME.serialize).toBeInstanceOf(Function)
    expect(LARGETEXTINPUT.serialize).toBeInstanceOf(Function)
    expect(URL.serialize).toBeInstanceOf(Function)
    expect(MULTISELECT.serialize).toBeInstanceOf(Function)
    expect(NUMBERINPUT.serialize).toBeInstanceOf(Function)
    expect(NUMBERWITHUNITINPUT.serialize).toBeInstanceOf(Function)
    expect(PHONENUMBER.serialize).toBeInstanceOf(Function)
    expect(RADIO.serialize).toBeInstanceOf(Function)
    expect(SELECT.serialize).toBeInstanceOf(Function)
    expect(TEXTINPUT.serialize).toBeInstanceOf(Function)
    expect(TIME.serialize).toBeInstanceOf(Function)
    expect(TIMERANGE.serialize).toBeInstanceOf(Function)
  })

  // CHACKBOX
  it('Checkbox to safely return boolean', async () => {
    expect(CHECKBOX.serialize(false)).toStrictEqual(false)
  })
  it('Checkbox to return null on null & undefined', async () => {
    expect(CHECKBOX.serialize(null)).toBeNull()
    expect(CHECKBOX.serialize(undefined)).toStrictEqual(null)
  })

  // CURRENCYINPUT
  it('Currencyinput to safely return object', async () => {
    expect(CURRENCYINPUT.serialize({ amount: 123, currency: 'EUR' })).toStrictEqual({ amount: 123, currency: 'EUR' })
  })
  it('Currencyinput to return null on missing value', async () => {
    expect(CURRENCYINPUT.serialize({ currency: 'EUR' })).toStrictEqual(null)
  })

  // DATE
  it('Date to return ISO DATE', async () => {
    expect(DATE.serialize(new Date('Wed, 18 Dec 2021 18:00:00 UTC'))).toStrictEqual('2021-12-18')
    expect(DATE.serialize(new Date('Wed, 18 Dec 2021'))).toStrictEqual('2021-12-18')
  })
  it('Date to handle null', async () => {
    expect(DATE.serialize(null)).toBeNull()
  })

  // DATERANGE
  it('Daterange to accept null range', async () => {
    const nullRange = {
      start: null,
      end: null
    }

    expect(DATERANGE.serialize(nullRange)).toStrictEqual({
      start: null,
      end: null
    })
  })

  it('Daterange to return ISO values', async () => {
    const range = {
      start: new Date('Wed, 18 Dec 2021 18:00:00 UTC'),
      end: new Date('Wed, 19 Dec 2021 18:00:00 UTC')
    }
    expect(DATERANGE.serialize(range)).toStrictEqual({
      start: '2021-12-18',
      end: '2021-12-19'
    })
  })

  it('Daterange to handle null', async () => {
    expect(DATERANGE.serialize(null)).toBeNull()
  })

  // DATETIME
  it('Datetime to return ISO DATETIMEs', async () => {
    expect(DATETIME.serialize(new Date('Wed, 18 Dec 2021 18:00:00 UTC'))).toStrictEqual('2021-12-18T19:00:00+01:00')
    expect(DATETIME.serialize(new Date('Wed, 18 Dec 2021'))).toStrictEqual('2021-12-18T00:00:00+01:00')
  })
  it('Datetime to handle null', async () => {
    expect(DATETIME.serialize(null)).toBeNull()
  })

  // DATETIMERANGE
  it('Datetimerange to accept null range', async () => {
    const nullRange = {
      start: null,
      end: null
    }

    expect(DATETIMERANGE.serialize(nullRange)).toStrictEqual({
      start: null,
      end: null
    })
  })

  it('Datetimerange to return ISO values', async () => {
    const range = {
      start: new Date('Wed, 18 Dec 2021 18:00:00 UTC'),
      end: new Date('Wed, 19 Dec 2021 18:00:00 UTC')
    }
    expect(DATETIMERANGE.serialize(range)).toStrictEqual({
      start: '2021-12-18T19:00:00+01:00',
      end: '2021-12-19T19:00:00+01:00'
    })
  })

  it('Datetimerange to handle null', async () => {
    expect(DATETIMERANGE.serialize(null)).toBeNull()
  })

  // LARGETEXTINPUT
  it('Largetextinput to handle null', async () => {
    expect(LARGETEXTINPUT.serialize(null)).toBeNull()
  })

  // URL
  it('Largetextinput to handle null', async () => {
    expect(URL.serialize(null)).toBeNull()
  })

  // MULTISELECT
  it('Multiselect to handle null', async () => {
    expect(MULTISELECT.serialize(null)).toBeNull()
  })
  it('Multiselect to handle empty array', async () => {
    expect(MULTISELECT.serialize([])).toStrictEqual([])
  })

  // NUMBERINPUT
  it('Numberinput to handle null', async () => {
    expect(NUMBERINPUT.serialize(null)).toBeNull()
    expect(NUMBERINPUT.serialize()).toBeNull()
  })
  it('Numberinput to handle 0', async () => {
    expect(NUMBERINPUT.serialize(0)).toStrictEqual(0)
  })

  // NUMBERWITHUNITINPUT
  it('Numberwithunitinput to handle null', async () => {
    expect(NUMBERWITHUNITINPUT.serialize(null)).toBeNull()
    expect(NUMBERWITHUNITINPUT.serialize()).toBeNull()
  })
  it('Numberwithunitinput to handle null values', async () => {
    const mock = {
      value: null,
      unit: null
    }
    expect(NUMBERWITHUNITINPUT.serialize(mock)).toStrictEqual({
      value: null,
      unit: null
    })
  })
  it('Numberwithunitinput to return object', async () => {
    const mock = {
      value: 4983645,
      unit: 'cm'
    }
    expect(NUMBERWITHUNITINPUT.serialize(mock)).toStrictEqual({
      value: 4983645,
      unit: 'cm'
    })
  })

  // PHONENUMBER
  it('Phonenumber to handle null', async () => {
    expect(PHONENUMBER.serialize(null)).toBeNull()
    expect(PHONENUMBER.serialize()).toBeNull()
  })

  // RADIO
  it('Radio to handle null', async () => {
    expect(RADIO.serialize(null)).toBeNull()
    expect(RADIO.serialize()).toBeNull()
  })
  it('Radio to handle string & number', async () => {
    expect(RADIO.serialize(1)).toStrictEqual(1)
    expect(RADIO.serialize('foo')).toStrictEqual('foo')
  })

  // SELECT
  it('Select to handle null', async () => {
    expect(SELECT.serialize(null)).toBeNull()
    expect(SELECT.serialize()).toBeNull()
  })
  it('Select to handle string & number', async () => {
    expect(SELECT.serialize(1)).toStrictEqual(1)
    expect(SELECT.serialize('foo')).toStrictEqual('foo')
  })

  // TEXTINPUT
  it('Textinput to handle null', async () => {
    expect(TEXTINPUT.serialize(null)).toBeNull()
    expect(TEXTINPUT.serialize()).toBeNull()
  })
  it('Textinput to handle string', async () => {
    expect(TEXTINPUT.serialize('foo')).toStrictEqual('foo')
  })

  // TIME
  it('Time to handle null', async () => {
    expect(TIME.serialize(null)).toBeNull()
    expect(TIME.serialize()).toBeNull()
  })
  it('Time to handle string', async () => {
    expect(TIME.serialize(new Date('Wed, 18 Dec 2021 18:00:00 UTC'))).toStrictEqual('19:00:00+01:00')
  })

  // TIMERANGE
  it('Timerange to accept null range', async () => {
    const nullRange = {
      start: null,
      end: null
    }

    expect(TIMERANGE.serialize(nullRange)).toStrictEqual({
      start: null,
      end: null
    })
  })

  it('Timerange to return ISO values', async () => {
    const range = {
      start: new Date('Wed, 18 Dec 2021 18:00:00 UTC'),
      end: new Date('Wed, 19 Dec 2021 20:00:00 UTC')
    }
    expect(TIMERANGE.serialize(range)).toStrictEqual({
      start: '19:00:00+01:00',
      end: '21:00:00+01:00'
    })
  })

  it('Timerange to handle null', async () => {
    expect(TIMERANGE.serialize(null)).toBeNull()
  })
})
