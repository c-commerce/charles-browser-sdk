/// <reference types="node" />
import events from 'events';
interface RealtimeOptions {
    endpoint?: string;
}
export default class Realtime extends events.EventEmitter {
    private initialized;
    private connected;
    private client?;
    options: RealtimeOptions;
    constructor(options?: RealtimeOptions);
    isInitialized(): boolean;
    isConnected(): boolean;
    destroy(): void;
}
export {};
