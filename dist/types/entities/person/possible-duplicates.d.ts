import { Universe } from 'src/universe';
import { EntityRawPayload, UniverseEntityOptions } from '../_base';
import { PersonRawPayload, PersonPhonenumberRawPayload } from './person';
import { ChannelUserRawPayload } from './channel-user';
import { BaseError } from '../../errors';
export interface PossibleDuplicatesRawPayload extends EntityRawPayload {
    readonly person_id: string;
    readonly strategies: PossibleDuplicatesStrategies;
}
interface PossibleDuplicatesStrategies {
    global_phonenumber?: StrategiesResult[];
    name_exact_matches?: StrategiesResult[];
}
interface StrategiesResult {
    document: StrategiesDocument;
    kind: string;
}
interface StrategiesDocument {
    person: Pick<PersonRawPayload, 'id' | 'kind' | 'name'>;
    channel_user?: Pick<ChannelUserRawPayload, 'id' | 'name' | 'phone'>;
    phone_number?: Pick<PersonPhonenumberRawPayload, 'id' | 'value'>;
}
interface PossibleDuplicationOptions extends UniverseEntityOptions {
    rawPayload: PossibleDuplicatesRawPayload;
}
export declare class PossibleDuplication {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: PossibleDuplicationOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    personId: PossibleDuplicatesRawPayload['person_id'];
    strategies: PossibleDuplicatesRawPayload['strategies'];
    constructor(options: PossibleDuplicationOptions);
    protected deserialize(rawPayload: PossibleDuplicatesRawPayload): PossibleDuplication;
    serialize(): PossibleDuplicatesRawPayload;
}
export declare class PossibleDuplicatesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
