interface IInjectableDataObject {
    [key: string]: any;
}
declare const _default: {
    api: {
        message: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feeds: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feedsActivities: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feedsEvents: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feedsOrders: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feedsMessages: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
        feedMessages: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        feedMessagesStatus: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        feedEvents: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        feedOrders: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        feedTyping: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        feedPresence: {
            template: string;
            generateTopic(data: IInjectableDataObject): string;
            isTopic(topic: string, data: IInjectableDataObject): boolean;
        };
        clients: {
            arm: {
                template: string;
                generateTopic(data: IInjectableDataObject): string;
                isTopic(topic: string): boolean;
            };
        };
        people: {
            template: string;
            generateTopic(): string;
            isTopic(topic: string): boolean;
        };
    };
};
export default _default;
