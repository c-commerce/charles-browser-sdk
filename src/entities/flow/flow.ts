
export type TriggerType = 'SHOP_TRIGGER' | 'MESSAGE_KEYWORD_TRIGGER' | 'MESSAGE_EXACT_TRIGGER' | 'REST_TRIGGER' | 'MANUAL_TRIGGER' | 'KLAVIYO_TRIGGER'
export interface FlowRawPayload {
  flowId: string
  flowName: string
  flowCategory: string | undefined
  revenue: number
  triggered: number
  source?: string
  clicks?: number
  revenuePerTrigger?: number
  triggerType?: TriggerType
}
