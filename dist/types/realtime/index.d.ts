/// <reference types="node" />
import events from 'events';
import { BaseError } from '../errors';
declare type MqttProtocoldIdOptions = 'MQTT';
declare type IMessagePayloadTypes = 'json' | 'string';
export interface RealtimeMessage {
    topic: string;
    mqttClientId: string | number | undefined;
    clientId: string;
    receivedAt: Date;
    attributes: {
        [key: string]: any;
    };
    payloadType: IMessagePayloadTypes;
    payload: {
        [key: string]: any;
    } | string;
}
export interface RealtimeMessageMessage extends RealtimeMessage {
    payload: {
        message: {
            [key: string]: any;
        };
    };
}
export interface RealtimeLastMessageReference {
    mqttClientId: RealtimeMessage['mqttClientId'];
    clientId: RealtimeMessage['clientId'];
    receivedAt: RealtimeMessage['receivedAt'];
}
interface MqttOptions {
    clean?: boolean;
    protocolId?: MqttProtocoldIdOptions;
    protocolVersion?: number;
    keepalive?: number;
    path?: string;
    rejectUnauthorized: boolean;
}
interface RealtimeClientOptions {
    base: string;
    messageType?: IMessagePayloadTypes;
    username: string;
    password: string;
    mqttOptions?: MqttOptions;
}
export declare type OnMessageCallback = (message: RealtimeMessage | RealtimeMessageMessage) => void;
export declare interface RealtimeClient {
    on(event: 'raw-error' | 'error', cb: (error: Error) => void): this;
    on(event: 'message', cb: OnMessageCallback): this;
    on(event: string, cb: Function): this;
}
export declare class RealtimeClient extends events.EventEmitter {
    initialized: boolean;
    connected: boolean;
    offline: boolean;
    options: RealtimeClientOptions;
    private client?;
    private mqttOptions;
    private last;
    constructor(options: RealtimeClientOptions);
    isInitialized(): boolean;
    isConnected(): boolean;
    private handleError;
    destroy(): void;
    private getClient;
    private handleMessagePayload;
    subscribe(topic: string, cb?: Function): RealtimeClient;
    unsubscribe(topic: string): RealtimeClient;
    publish(topic: string, payload?: any): RealtimeClient;
}
export declare class UninstantiatedMqttClient extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
