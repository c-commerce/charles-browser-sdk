import { EntityRawPayload } from '../_base';
import { PersonRawPayload, PersonPhoneNumberRawPayload } from './person';
import { ChannelUserRawPayload } from './channel-user';
import { BaseError } from '../../errors';
export interface PossibleDuplicatesRawPayload extends EntityRawPayload {
    readonly person_id: string;
    readonly strategies: PossibleDuplicatesStrategies;
}
export interface PossibleDuplicatesStrategies {
    readonly global_phone_number?: StrategiesResult[];
    readonly name_exact_matches?: StrategiesResult[];
}
export interface StrategiesResult {
    readonly document: StrategiesDocument;
    readonly kind: string;
}
export interface StrategiesDocument {
    readonly person: Pick<PersonRawPayload, 'id' | 'kind' | 'name'>;
    readonly channel_user?: Pick<ChannelUserRawPayload, 'id' | 'name' | 'phone'>;
    readonly phone_number?: Pick<PersonPhoneNumberRawPayload, 'id' | 'value'>;
}
export interface PossibleDuplicatesPayload {
    readonly id?: PossibleDuplicatesRawPayload['id'];
    readonly personId: PossibleDuplicatesRawPayload['person_id'];
    readonly strategies: PossibleDuplicatesRawPayload['strategies'];
}
export declare class PossibleDuplicatesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
