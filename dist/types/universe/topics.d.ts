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
        clients: {
            arm: {
                template: string;
                generateTopic(data: IInjectableDataObject): string;
                isTopic(topic: string): boolean;
            };
        };
    };
};
export default _default;
