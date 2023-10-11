export const dataset = [
  {
    category: 'events',
    operands: [
      {
        label: 'campaigns.clicked',
        value: 'events.campaigns.clicked',
        source: null
      },
      {
        label: 'campaigns.received',
        value: 'events.campaigns.received',
        source: null
      },
      {
        label: 'campaigns.read',
        value: 'events.campaigns.read',
        source: null
      },
      {
        label: 'messages.received',
        value: 'events.messages.received',
        source: null
      },
      {
        label: 'messages.sent',
        value: 'events.messages.sent',
        source: null
      },
      {
        label: 'products.bought',
        value: 'events.products.bought',
        source: null
      }
    ],
    disabled: false
  },
  {
    category: 'properties',
    disabled: false,
    operands: [
      {
        label: 'predicted-mood',
        value: 'properties.predicted-mood',
        source: null
      },
      {
        label: 'tags',
        value: 'properties.tags',
        source: null
      },
      {
        label: 'storefront-vendor-tags',
        value: 'properties.storefront-vendor-tags',
        source: null
      },
      {
        label: 'total-order',
        value: 'properties.total-order',
        source: null
      },
      {
        label: 'created-date',
        value: 'properties.created-date',
        source: null
      },
      {
        label: 'last-order-date',
        value: 'properties.last-order-date',
        source: null
      },
      {
        label: 'custom-property',
        value: 'properties.custom-property',
        source: null
      },
      {
        label: 'email',
        value: 'properties.email',
        source: null
      }
    ]
  },
  {
    category: 'optin',
    disabled: false,
    operands: [
      {
        label: 'optin-last',
        value: 'optins.optin-last',
        source: null
      },
      {
        label: 'optout-last',
        value: 'optins.optout-last',
        source: null
      },
      {
        label: 'optin-only',
        value: 'optins.optin-only',
        source: null
      },
      {
        label: 'many-optins',
        value: 'optins.many-optins',
        source: null
      }
    ]
  },
  {
    category: 'list',
    disabled: false,
    operands: [
      {
        label: 'list',
        value: 'list',
        source: null
      }
    ]
  }
] as const

export type AvailableOperandValues = (typeof dataset)[number]['operands'][number]['value']
export type AvailableCategoryValues = (typeof dataset)[number]['category']
export type AvailableOperands = (typeof dataset)[number]['operands'][number]
export type AvailableCategories = (typeof dataset)[number]

export type NodeType = 'GroupExpr' | 'RuleExpr' | 'RuleGroupExpr' | 'FilterExpr'
export interface Node {
  type: NodeType
  id?: string
}

export type ValueType = 'DATE' | 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ARRAY' | 'SINGLE'
export interface FilterExpr<T = any, OPERAND = string, OP = string> extends Node {
  type: 'FilterExpr'
  operand: OPERAND
  op: OP
  value?: T
  valueType?: ValueType
}

export type MergeType = 'inclusion' | 'exclusion'
export interface RuleExpr extends Node {
  operand: AvailableOperandValues
  type: 'RuleExpr'
  mergeType: MergeType
  requiredFilters?: GroupExpr
  optionalFilters?: GroupExpr
}

export interface GroupExpr extends Node {
  op: 'OR' | 'AND'
  type: 'GroupExpr'
  rules: Array<FilterExpr | GroupExpr>
}

export type RuleGroupExpr = Omit<GroupExpr, 'type' | 'rules'> & {
  type: 'RuleGroupExpr'
  rules: Array<RuleExpr | RuleGroupExpr>
}
