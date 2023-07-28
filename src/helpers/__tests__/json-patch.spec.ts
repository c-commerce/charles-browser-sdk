import { OpPatch } from '../../@types/json-patch'
import { processPatches } from '../json-patch'

describe('Test processPatches', () => {
  const cases: Array<{ ops: any[], expected: OpPatch[] }> = [
    {
      ops: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: 'name'
        }
      ],
      expected: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: 'name'
        }
      ]
    },
    {
      ops: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: undefined
        }
      ],
      expected: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: null
        }
      ]
    },
    {
      ops: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name'
        }
      ],
      expected: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: null
        }
      ]
    },
    {
      ops: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: null
        }
      ],
      expected: [
        {
          op: 'add',
          path: '/person',
          value: '1'
        },
        {
          op: 'replace',
          path: '/name',
          value: null
        }
      ]
    }
  ]

  cases.forEach((testCase, idx) => {
    it(`test #${idx}`, () => {
      expect(processPatches(testCase.ops)).toStrictEqual(testCase.expected)
    })
  })
})
