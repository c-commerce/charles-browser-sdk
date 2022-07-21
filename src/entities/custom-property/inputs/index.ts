
import { formatISO } from 'date-fns'

/**
 * Helper classes to serialize custom property input values
 * Serves as the soft contract counterpart to the API implementation of custom properties
 */

export const CHECKBOX = {
  serialize (input?: Boolean | null | undefined): Boolean | null {
    if (typeof input === 'boolean') {
      return input
    }
    if (input === null || input === undefined) {
      return null
    }
    throw new Error('Checkbox input must be boolean or null')
  }
}

interface ICurrencyInput {
  amount?: number
  currency?: string
}

export const CURRENCYINPUT = {
  serialize (input?: ICurrencyInput): ICurrencyInput | null {
    if (input?.amount && input?.currency) {
      return input
    }
    return null
  }
}

export const DATE = {
  serialize (input?: number | globalThis.Date | null): string | null {
    if (!input) {
      return null
    }
    return formatISO(input, { representation: 'date' })
  }
}

interface IDaterangeInput {
  start?: Date | null | any
  end?: Date | null | any
}

export const DATERANGE = {
  serialize (input?: IDaterangeInput | null): Object | null {
    if (!input) {
      return null
    }
    const start = input?.start ? formatISO(input.start, { representation: 'date' }) : null
    const end = input?.end ? formatISO(input.end, { representation: 'date' }) : null
    if (start === 'Invalid Date' || end === 'invalid Date') {
      throw new Error('DATERANGE start & end values must be valid dates')
    }
    return {
      start: start,
      end: end
    }
  }
}

export const DATETIME = {
  serialize (input?: number | globalThis.Date | null): string | null {
    if (!input) {
      return null
    }
    return formatISO(input)
  }
}

interface IDatetimerangeInput {
  start?: Date | null | any
  end?: Date | null | any
}

export const DATETIMERANGE = {
  serialize (input?: IDatetimerangeInput | null): Object | null {
    if (!input) {
      return null
    }
    const start = input?.start ? formatISO(input.start) : null
    const end = input?.end ? formatISO(input.end) : null
    if (start === 'Invalid Date' || end === 'invalid Date') {
      throw new Error('DATETIMERANGE start & end values must be valid dates')
    }
    return {
      start: start,
      end: end
    }
  }
}

export const LARGETEXTINPUT = {
  serialize (input?: string | null): string | null {
    return input ?? null
  }
}

export const URLINPUT = {
  serialize (input?: string | null): string | null {
    return input ?? null
  }
}

export const MULTISELECT = {
  serialize (inputs?: string[] | number[] | null): Array<string|number> | null {
    if (!inputs) {
      return null
    }

    return inputs
  }
}

export const NUMBERINPUT = {
  serialize (input?: number | null): number | null | undefined {
    return input ?? null
  }
}

interface InumberwithunitinputInput {
  value?: number | null
  unit?: string | null
}

export const NUMBERWITHUNITINPUT = {
  serialize (input?: InumberwithunitinputInput | null): InumberwithunitinputInput | null {
    if (!input) {
      return null
    }
    return input
  }
}

export const PHONENUMBER = {
  serialize (input?: string | null): string | null {
    return input ?? null
  }
}

export const RADIO = {
  serialize (input?: string | number | null): string | number | null {
    return input ?? null
  }
}

export const SELECT = {
  serialize (input?: string |number | null): string | number | null {
    return input ?? null
  }
}

export const TEXTINPUT = {
  serialize (input?: string | null): string | null {
    return input ?? null
  }
}

export const TIME = {
  serialize (input?: number | globalThis.Date | null): string | null {
    if (!input) {
      return null
    }
    return formatISO(input, { representation: 'time' })
  }
}
interface ITimerangeInput {
  start?: Date | any
  end?: Date | any
}
export const TIMERANGE = {
  serialize (input?: ITimerangeInput | null): Object | null {
    if (!input) {
      return null
    }
    const start = input?.start ? formatISO(input.start, { representation: 'time' }) : null
    const end = input?.end ? formatISO(input.end, { representation: 'time' }) : null
    if (start === 'Invalid Date' || end === 'invalid Date') {
      throw new Error('DATERANGE start & end values must be valid dates')
    }
    return {
      start: start,
      end: end
    }
  }
}
