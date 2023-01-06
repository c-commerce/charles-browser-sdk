/* eslint-disable no-template-curly-in-string */
import template from 'just-template'

interface IInjectableDataObject {
  [key: string]: any
}

abstract class TopicGenerator {
  public abstract get template (): string
  public abstract generateTopic (data?: IInjectableDataObject, ...args: any[]): string
  public isTopic (topic: string, data?: IInjectableDataObject): boolean {
    return topic === this.template
  }
}

const uuidRegex = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

export default {
  api: {
    message: new (class extends TopicGenerator {
      get template (): string { return 'api/message' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feeds: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feedsActivities: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/*/activities' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feedsEvents: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/*/events' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feedsOrders: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/*/orders' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feedsMessages: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/*/messages' }
      generateTopic (): string {
        return this.template
      }
    })(),
    feedMessages: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/messages' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    feedMessagesStatus: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/messages/*/status' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id).replace('*', '\\*'), 'g').test(topic)
      }
    })(),
    feedMessagesReactions: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/messages/*/reactions' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id).replace('*', '\\*'), 'g').test(topic)
      }
    })(),
    feedEvents: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/events' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    feedOrders: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/orders' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    feedTyping: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/typing' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    feedPresence: new (class extends TopicGenerator {
      get template (): string { return 'api/feeds/${id}/presence' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    clients: {
      arm: new (class extends TopicGenerator {
        get template (): string { return 'api/clients/${clientId}/arm' }
        generateTopic (data: IInjectableDataObject): string {
          return template(
            this.template,
            data
          )
        }

        isTopic (topic: string): boolean {
          // TODO: this expression
          return new RegExp(this.template.replace('${clientId}', '\\w+'), 'g').test(topic)
        }
      })()
    },
    people: new (class extends TopicGenerator {
      get template (): string { return 'api/people' }
      generateTopic (): string {
        return this.template
      }
    })(),
    personChange: new (class extends TopicGenerator {
      get template (): string { return 'api/people/${id}' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic)
      }
    })(),
    entityPresence: new (class extends TopicGenerator {
      get template (): string { return 'entity/${entityName}/${id}/presence' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${id}', data.id).replace('${entityName}', data.entityName)
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(this.template.replace('${id}', uuidRegex).replace('${entityName}', '[a-zA-Z]+(?:_[a-zA-Z]+)*'), 'g').test(topic)
      }
    })(),
    entityChanges: new (class extends TopicGenerator {
      get template (): string { return 'entity/${entityName}/${id}/changed' }
      generateTopic (data: IInjectableDataObject): string {
        return this.template.replace('${entityName}', data.entityName).replace('${id}', data.id ?? '+')
      }

      isTopic (topic: string, data: IInjectableDataObject): boolean {
        return new RegExp(/^entity\/?([0-9a-zA-Z_-].{1,64}|\+)\/(([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})|(\+))\/changed$/, 'g').test(topic)
      }
    })()
  }
}
