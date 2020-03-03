import template from 'just-template'

interface IInjectableDataObject {
  [key: string]: any
}

abstract class TopicGenerator {
  public abstract template: string
  public abstract generateTopic(data?: IInjectableDataObject, ...args: any[]): string
  public abstract isTopic(topic: string): boolean
}

export default {
  api: {
    message: new (class extends TopicGenerator {
      template: string = 'api/message'
      generateTopic(): string {
        return this.template
      }
      isTopic(topic: string): boolean {
        return topic === this.template
      }
    })(),
    feeds: new (class extends TopicGenerator {
      template: string = 'api/feeds'
      generateTopic(): string {
        return this.template
      }
      isTopic(topic: string): boolean {
        return topic === this.template
      }
    })(),
    feedsActivities: new (class extends TopicGenerator {
      template: string = 'api/feeds/*/activities'
      generateTopic(): string {
        return this.template
      }
      isTopic(topic: string): boolean {
        return topic === this.template
      }
    })(),
    feedsMessages: new (class extends TopicGenerator {
      template: string = 'api/feeds/*/messages'
      generateTopic(): string {
        return this.template
      }
      isTopic(topic: string): boolean {
        return topic === this.template
      }
    })(),
    clients: {
      arm: new (class extends TopicGenerator {
        template: string = 'api/clients/${clientId}/arm'
        generateTopic(data: IInjectableDataObject): string {
          return template(
            this.template,
            data
          )
        }
        isTopic(topic: string): boolean {
          // TODO: this expression
          return new RegExp(this.template.replace('${clientId}', '\\w+'), 'g').test(topic)
        }
      })()
    }
  }
}

// export function availableTopics(): Map<string, TopicGenerator> {

// }
