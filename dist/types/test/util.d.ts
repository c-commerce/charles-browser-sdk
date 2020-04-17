import { CharlesClient } from '../src/charles';
import { Universe } from '../src/universe';
import { Client } from '../src/client';
export declare class LocalStorageMock {
    private store;
    clear(): void;
    getItem(key: string): any;
    setItem(key: string, value: string | null): void;
    removeItem(key: string): void;
}
/**
 * Instantiate Charles in the tests - reduce boilerplate
 */
export declare function initInstance(opts?: object): Promise<CharlesClient>;
export declare function stubUniverse(): {
    universe: Universe;
    client: Client;
};
