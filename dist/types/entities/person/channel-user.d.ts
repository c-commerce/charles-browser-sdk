import { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import * as messageTemplate from '../message-template/message-template';
import * as event from '../../eventing/feeds/event';
import { BaseError } from '../../errors';
export interface ChannelUserRawPayload extends EntityRawPayload {
    readonly person?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly last_source_fetch_at?: string;
    readonly broker?: string;
    readonly external_person_reference_id?: string | null;
    readonly external_person_custom_id?: string | null;
    readonly external_channel_reference_id?: string | null;
    readonly source_type?: string;
    readonly source_api?: string;
    readonly payload_name?: string;
    readonly comment?: string;
    readonly payload?: object | null;
    readonly links?: object;
}
export interface ChannelUserOptions extends EntityOptions {
    rawPayload?: ChannelUserRawPayload;
}
export declare class ChannelUser {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ChannelUserOptions;
    initialized: boolean;
    id?: string;
    value?: string;
    type?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deleted?: ChannelUserRawPayload['deleted'];
    active?: ChannelUserRawPayload['active'];
    person?: ChannelUserRawPayload['person'];
    lastSourceFetchAt?: Date | null;
    broker?: ChannelUserRawPayload['broker'];
    externalPersonReferenceId?: ChannelUserRawPayload['external_person_reference_id'];
    externalPersonCustomId?: ChannelUserRawPayload['external_person_custom_id'];
    externalChannelReferenceId?: ChannelUserRawPayload['external_channel_reference_id'];
    sourceType?: ChannelUserRawPayload['source_type'];
    sourceApi?: ChannelUserRawPayload['source_api'];
    payloadName?: ChannelUserRawPayload['payload_name'];
    comment?: ChannelUserRawPayload['comment'];
    payload?: ChannelUserRawPayload['payload'];
    links?: ChannelUserRawPayload['links'];
    constructor(options: ChannelUserOptions);
    protected deserialize(rawPayload: ChannelUserRawPayload): ChannelUser;
    static create(payload: ChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser;
    static createUninitialized(payload: ChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser;
    serialize(): ChannelUserRawPayload;
    sendMessageFromMessageTemplate(messageTemplate: messageTemplate.MessageTemplate, language: string, parameters?: object | object[] | null): Promise<event.Event | undefined>;
}
export declare class PersonChannelUserMessageTemplateSendError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
