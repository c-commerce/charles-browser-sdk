import { UniverseHealth, UniverseStatus } from './status';
import { Client } from '../client';
import { APICarrier } from '../base';
import { Feeds, Feed, FeedRawPayload } from '../eventing/feeds/feed';
import { BaseError } from '../errors';
import { MessageRawPayload } from '../messaging';
import { EntityFetchOptions, EntityFetchQuery } from '../entities/_base';
import { AnalyticsReport } from '../analytics/analytics';
import * as staff from '../entities/staff/staff';
import * as track from '../entities/track/track';
import * as asset from '../entities/asset/asset';
import * as person from '../entities/person/person';
import * as channelUser from '../entities/person/channel-user';
import * as email from '../entities/person/email';
import * as product from '../entities/product/product';
import * as ticket from '../entities/ticket/ticket';
import * as cart from '../entities/cart/cart';
import * as order from '../entities/order/order';
import * as discount from '../entities/discount/discount';
import * as messageTemplate from '../entities/message-template/message-template';
import { Product, ProductRawPayload } from '../entities/product/product';
import * as productCategory from '../entities/product-category/product-category';
import * as productCategoryTree from '../entities/product-category-tree/product-category-tree';
import * as messageTemplateCategory from '../entities/message-template-category/message-template-category';
import * as messageTemplateCategoryTree from '../entities/message-template-category-tree/message-template-category-tree';
import * as customProperty from '../entities/custom-property/custom-property';
import * as tag from '../entities/tag/tag';
import * as tagGroup from '../entities/tag-group/tag-group';
import * as configuration from '../entities/configuration/configuration';
import * as inventory from '../entities/inventory/inventory';
import * as integration from '../entities/integration/integration';
import * as messageBroker from '../entities/message-broker/message-broker';
import * as storefront from '../entities/storefront/storefront';
import * as shippingMethod from '../entities/shipping-method/shipping-method';
import * as route from '../entities/route/route';
import * as thing from '../entities/thing/thing';
import * as nlu from '../entities/nlu/nlu';
import * as intent from '../entities/intent/intent';
import * as message from '../messaging/message';
import * as location from '../entities/location/location';
import * as contactList from '../entities/contact-list/contact-list';
import * as notificationCampaign from '../entities/notification-campaign/notification-campaign';
import * as favorite from '../entities/favorite/favorite';
import * as knowledgeBase from '../entities/knowledge-base/knowledge-base';
import * as knowledgeBaseFaqItem from '../entities/knowledge-base-faq-item/knowledge-base-faq-item';
import * as crm from '../entities/crm/crm';
import * as deal from '../entities/deal/deal';
import * as pipeline from '../entities/crm/pipeline';
import * as pipelineStage from '../entities/crm/pipeline-stage';
import * as dealEvent from '../entities/deal/deal-event';
import * as messageSubscription from '../entities/message-subscription/message-subscription';
import * as messageSubscriptionInstance from '../entities/message-subscription-instance/message-subscription-instance';
import * as peopleOrganization from '../entities/people-organization/people-organization';
import * as urlShortener from '../entities/url-shortener/url-shortener';
import * as apiKey from '../entities/api-key/api-key';
export interface UniverseUser {
    id?: string;
    accessToken?: string;
}
export interface UniverseOptions {
    name: string;
    universeBase?: string;
    mqttUniverseBase?: string;
    http: Client;
    base: string;
    user: UniverseUser;
}
export interface ApiRequestOptions {
    method: string;
    path: string;
    data?: object;
    query?: EntityFetchQuery;
}
export interface UniversePayload {
    name: string;
    id: string;
    active: boolean;
    deleted: boolean;
    organization: string;
    configuration: object | null;
    updatedAt: Date | null;
    createdAt: Date | null;
}
export interface UniverseFetchQuery {
    [key: string]: any;
}
export interface UniverseFetchOptions {
    raw?: boolean;
    query?: UniverseFetchQuery;
}
export interface UniverseExportCsvOptions {
    query?: UniverseFetchQuery;
}
export declare interface Universe {
    on: ((event: 'raw-error' | 'error', cb: (error: Error) => void) => this) & ((event: 'armed' | 'universe:message' | 'universe:feeds:messages' | 'universe:feeds:events' | 'universe:feeds' | string, cb: Function) => this);
}
export interface UnviverseSearchResultItem {
    document: object;
}
export interface UnviversePeopleSearchResultItem extends UnviverseSearchResultItem {
    document: {
        id: person.PersonRawPayload['id'];
        name: person.PersonRawPayload['name'];
        first_name: person.PersonRawPayload['first_name'];
        middle_name: person.PersonRawPayload['middle_name'];
        last_name: person.PersonRawPayload['last_name'];
        created_at: person.PersonRawPayload['created_at'];
        avatar: person.PersonRawPayload['avatar'];
    };
    feeds: string[];
}
export interface UnviverseProductsSearchResultItem extends UnviverseSearchResultItem {
    document: {
        id: product.ProductRawPayload['id'];
        created_at: product.ProductRawPayload['created_at'];
        updated_at: product.ProductRawPayload['updated_at'];
        name: product.ProductRawPayload['name'];
        summary: product.ProductRawPayload['summary'];
        description: product.ProductRawPayload['description'];
        type: product.ProductRawPayload['type'];
        assets_config: product.ProductRawPayload['assets_config'];
    };
}
export interface UnviverseFeedsSearchResultItem extends UnviverseSearchResultItem {
    document: {
        id: MessageRawPayload['id'];
        date: MessageRawPayload['date'];
        feed: MessageRawPayload['feed'];
        person: MessageRawPayload['person'];
        content: MessageRawPayload['content'];
    };
    event: string;
    feed: string;
    resource_type: 'message';
    person: person.PersonRawPayload;
}
export interface UniverseSearches {
    people: (q: string) => Promise<UnviversePeopleSearchResultItem[]>;
    feeds: (q: string) => Promise<UnviverseFeedsSearchResultItem[]>;
    products: (q: string) => Promise<UnviverseProductsSearchResultItem[]>;
}
export interface UniverseAnalyticsOptions {
    start: string;
    timezone: string;
    end: string;
    period?: string;
}
export interface UniverseAnalytics {
    orders: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
    revenues: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
    xau: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
    feedOpenedClosed: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
    feedConversion: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
    peopleMessagingChannelParticipationDistribution: (options: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>;
}
export interface UniverseFeeds {
    fetch: (options?: UniverseFetchOptions) => Promise<Feed[] | FeedRawPayload[] | undefined>;
    fetchCount: (options?: UniverseFetchOptions) => Promise<{
        count: number;
    }>;
    fromJson: (feeds: FeedRawPayload[]) => Feed[];
    toJson: (feeds: Feed[]) => FeedRawPayload[];
    stream: (options?: UniverseFetchOptions) => Promise<Feeds>;
}
export interface UniversePeople {
    fetch: (options?: UniverseFetchOptions) => Promise<person.Person[] | person.PersonRawPayload[] | undefined>;
    fetchCount: (options?: UniverseFetchOptions) => Promise<{
        count: number;
    }>;
    fromJson: (feeds: person.PersonRawPayload[]) => person.Person[];
    toJson: (feeds: person.Person[]) => person.PersonRawPayload[];
    stream: (options?: UniverseFetchOptions) => Promise<person.People>;
    export: (options?: UniverseExportCsvOptions) => Promise<Blob>;
}
export interface UniverseTracks {
    fromJson: (payloads: track.TrackRawPayload[]) => track.Track[];
    toJson: (feeds: track.Track[]) => track.TrackRawPayload[];
    fetch: (options?: EntityFetchOptions) => Promise<track.Track[] | track.TrackRawPayload[] | undefined>;
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
    current: (options?: EntityFetchOptions) => Promise<track.Track[] | track.TrackRawPayload[] | undefined>;
}
export interface UniverseProducts {
    fetch: (options?: EntityFetchOptions) => Promise<Product[] | ProductRawPayload[] | undefined>;
    fromJson: (products: ProductRawPayload[]) => Product[];
    toJson: (products: Product[]) => ProductRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
}
export interface IUniverseCarts {
    fetch: (options?: UniverseFetchOptions) => Promise<cart.Cart[] | cart.CartRawPayload[] | undefined>;
    fromJson: (carts: cart.CartRawPayload[]) => cart.Cart[];
    toJson: (carts: cart.Cart[]) => cart.CartRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
}
export interface IUniverseOrders {
    fetch: (options?: UniverseFetchOptions) => Promise<order.Order[] | order.OrderRawPayload[] | undefined>;
    fromJson: (orders: order.OrderRawPayload[]) => order.Order[];
    toJson: (orders: order.Order[]) => order.OrderRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
    export: (options?: UniverseExportCsvOptions) => Promise<Blob>;
}
export interface IUniverseContactLists {
    fetch: (options?: UniverseFetchOptions) => Promise<contactList.ContactList[] | contactList.ContactListRawPayload[] | undefined>;
    fromJson: (contactLists: contactList.ContactListRawPayload[]) => contactList.ContactList[];
    toJson: (contactLists: contactList.ContactList[]) => contactList.ContactListRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
}
export interface IUniverseNotificationCampaigns {
    fetch: (options?: UniverseFetchOptions) => Promise<notificationCampaign.NotificationCampaign[] | notificationCampaign.NotificationCampaignRawPayload[] | undefined>;
    fromJson: (notificationCampaigns: notificationCampaign.NotificationCampaignRawPayload[]) => notificationCampaign.NotificationCampaign[];
    toJson: (notificationCampaigns: notificationCampaign.NotificationCampaign[]) => notificationCampaign.NotificationCampaignRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
}
export interface IUniverseDeals {
    fetch: (options?: UniverseFetchOptions) => Promise<deal.Deal[] | deal.DealRawPayload[] | undefined>;
    fromJson: (deals: deal.DealRawPayload[]) => deal.Deal[];
    toJson: (deals: deal.Deal[]) => deal.DealRawPayload[];
    fetchCount: (options?: EntityFetchOptions) => Promise<{
        count: number;
    }>;
}
export declare class UniverseUnauthenticatedError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseMeError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export interface UniverseErrors {
    UniverseUnauthenticatedError: new () => UniverseUnauthenticatedError;
    UniverseMeError: new () => UniverseMeError;
}
export declare type UniversePermissionType = 'admin';
export declare type UniverseRoleType = 'admin';
export interface MeData {
    user: {
        email: string;
        sub: string;
        authenticated: boolean;
    };
    permissions: UniversePermissionType[];
    roles: UniversePermissionType[];
    staff: staff.StaffRawPayload;
}
interface BaseResourceCreateable<T, K> {
    new (...args: any[]): T;
    create: (payload: K, universe: Universe, http: Universe['http']) => T;
}
interface BaseResourceList<T> {
    endpoint: string;
    new (...args: any[]): T;
}
declare type BaseResourceErrorProto<E> = new (...args: any[]) => E;
declare type BaseResourceEntityFetchOptions<O> = EntityFetchOptions;
export declare class Universe extends APICarrier {
    status: UniverseStatus;
    health: UniverseHealth;
    options: UniverseOptions;
    name: UniverseOptions['name'];
    initialized: boolean;
    payload: UniversePayload | null;
    user: UniverseUser;
    protected http: Client;
    private mqtt;
    base: string;
    universeBase: string;
    mqttUniverseBase: string;
    private static readonly endpoint;
    private _cachedMeData?;
    constructor(options: UniverseOptions);
    init(): Promise<Universe | undefined>;
    static get errors(): UniverseErrors;
    get errors(): UniverseErrors;
    private static parsePayload;
    private setInitialized;
    private setMqttClient;
    private get defaultSubscriptions();
    private subscribeDefaults;
    subscribe(topic: string | string[]): Universe;
    unsubscribe(topic: string | string[]): Universe;
    private handleMessage;
    private getMqttClient;
    create(options: UniverseOptions): Universe;
    deinitialize(): void;
    get ready(): boolean;
    isReady(): boolean;
    get connected(): boolean;
    isConnected(): boolean;
    private handleError;
    private baseResourceFactory;
    feed(payload: FeedRawPayload): Feed;
    product(payload: product.ProductRawPayload): product.Product;
    staff(payload: staff.StaffRawPayload): staff.Staff;
    track(payload: track.TrackRawPayload): track.Track;
    asset(payload: asset.AssetRawPayload): asset.Asset;
    cart(payload: cart.CartRawPayload): cart.Cart;
    order(payload: order.OrderRawPayload): order.Order;
    person(payload: person.PersonRawPayload): person.Person;
    address(payload: person.PersonAddressRawPayload): person.Address;
    phonenumber(payload: person.PersonPhonenumberRawPayload): person.Phonenumber;
    channelUser(payload: person.PersonChannelUserRawPayload): channelUser.ChannelUser;
    email(payload: person.PersonEmailRawPayload): email.Email;
    ticket(payload: ticket.TicketRawPayload): ticket.Ticket;
    discount(payload: discount.DiscountRawPayload): discount.Discount;
    messageTemplate(payload: messageTemplate.MessageTemplateRawPayload): messageTemplate.MessageTemplate;
    productCategory(payload: productCategory.ProductCategoryRawPayload): productCategory.ProductCategory;
    productCategoryTree(payload: productCategoryTree.ProductCategoryTreeRawPayload): productCategoryTree.ProductCategoryTree;
    messageTemplateCategory(payload: messageTemplateCategory.MessageTemplateCategoryRawPayload): messageTemplateCategory.MessageTemplateCategory;
    messageTemplateCategoryTree(payload: messageTemplateCategoryTree.MessageTemplateCategoryTreeRawPayload): messageTemplateCategoryTree.MessageTemplateCategoryTree;
    customProperty(payload: customProperty.CustomPropertyRawPayload): customProperty.CustomProperty;
    tag(payload: tag.TagRawPayload): tag.Tag;
    tagGroup(payload: tagGroup.TagGroupRawPayload): tagGroup.TagGroup;
    configuration(payload: configuration.ConfigurationRawPayload): configuration.Configuration;
    inventory(payload: inventory.InventoryRawPayload): inventory.Inventory;
    integration(payload: integration.IntegrationRawPayload): integration.Integration;
    messageBroker(payload: messageBroker.MessageBrokerRawPayload): messageBroker.MessageBroker;
    storefront(payload: storefront.StorefrontRawPayload): storefront.Storefront;
    shippingMethod(payload: shippingMethod.ShippingMethodRawPayload): shippingMethod.ShippingMethod;
    route(payload: route.RouteRawPayload): route.Route;
    thing(payload: thing.ThingRawPayload): thing.Thing;
    nlu(payload: nlu.NluRawPayload): nlu.Nlu;
    intent(payload: intent.IntentRawPayload): intent.Intent;
    location(payload: location.LocationRawPayload): location.Location;
    message(payload: message.MessageRawPayload): message.Message;
    contactList(payload: contactList.ContactListRawPayload): contactList.ContactList;
    notificationCampaign(payload: notificationCampaign.NotificationCampaignRawPayload): notificationCampaign.NotificationCampaign;
    favorite(payload: favorite.FavoriteRawPayload): favorite.Favorite;
    knowledgeBase(payload: knowledgeBase.KnowledgeBaseRawPayload): knowledgeBase.KnowledgeBase;
    knowledgeBaseFaqItem(payload: knowledgeBaseFaqItem.KnowledgeBaseFaqItemRawPayload): knowledgeBaseFaqItem.KnowledgeBaseFaqItem;
    crm(payload: crm.CRMRawPayload): crm.CRM;
    deal(payload: deal.DealRawPayload): deal.Deal;
    pipeline(payload: pipeline.PipelineRawPayload): pipeline.Pipeline;
    pipelineStage(payload: pipelineStage.PipelineStageRawPayload): pipelineStage.PipelineStage;
    dealEvent(payload: dealEvent.DealEventRawPayload): dealEvent.DealEvent;
    messageSubscription(payload: messageSubscription.MessageSubscriptionRawPayload): messageSubscription.MessageSubscription;
    messageSubscriptionInstance(payload: messageSubscriptionInstance.MessageSubscriptionInstanceRawPayload): messageSubscriptionInstance.MessageSubscriptionInstance;
    peopleOrganization(payload: peopleOrganization.PeopleOrganizationRawPayload): peopleOrganization.PeopleOrganization;
    urlShortener(payload: urlShortener.UrlShortenerRawPayload): urlShortener.UrlShortener;
    apiKey(payload: apiKey.ApiKeyRawPayload): apiKey.ApiKey;
    apiRequest(options: ApiRequestOptions): Promise<{
        [key: string]: any;
    } | Array<{
        [key: string]: any;
    } | undefined>>;
    private setCachedMeData;
    get authData(): {
        me?: MeData;
    };
    me(): Promise<MeData | undefined>;
    private makeAnalyticsRequest;
    get analytics(): UniverseAnalytics;
    get feeds(): UniverseFeeds;
    get people(): UniversePeople;
    staffs(options?: EntityFetchOptions): Promise<staff.Staff[] | staff.StaffRawPayload[] | undefined>;
    get tracks(): UniverseTracks;
    assets(): Promise<asset.Asset[] | undefined>;
    get products(): UniverseProducts;
    tickets(): Promise<ticket.Ticket[] | undefined>;
    get carts(): IUniverseCarts;
    get orders(): IUniverseOrders;
    discounts(): Promise<discount.Discount[] | undefined>;
    messageTemplates(): Promise<messageTemplate.MessageTemplate[] | undefined>;
    productCategories(options?: EntityFetchOptions): Promise<productCategory.ProductCategory[] | productCategory.ProductCategoryRawPayload[] | undefined>;
    productCategoryTrees(options?: EntityFetchOptions): Promise<productCategoryTree.ProductCategoryTree[] | productCategoryTree.ProductCategoryTreeRawPayload[] | undefined>;
    messageTemplateCategories(): Promise<messageTemplateCategory.MessageTemplateCategory[] | undefined>;
    messageTemplateCategoryTrees(): Promise<messageTemplateCategoryTree.MessageTemplateCategoryTree[] | undefined>;
    customProperties(): Promise<customProperty.CustomProperty[] | undefined>;
    makeBaseResourceListRequest<T, TL, K, O, E>(proto: BaseResourceCreateable<T, K>, listProto: BaseResourceList<TL>, errorProto: BaseResourceErrorProto<E>, options?: BaseResourceEntityFetchOptions<O>): Promise<T[] | K[] | undefined>;
    tags(options?: EntityFetchOptions): Promise<tag.Tag[] | tag.TagRawPayload[] | undefined>;
    tagGroups(options?: EntityFetchOptions): Promise<tagGroup.TagGroup[] | tagGroup.TagGroupRawPayload[] | undefined>;
    configurations(options?: EntityFetchOptions): Promise<configuration.Configuration[] | configuration.ConfigurationRawPayload[] | undefined>;
    uiConfigurations({ query: { owner }, ...rest }: {
        query: {
            owner: string;
        };
        [key: string]: any;
    }): Promise<configuration.Configuration[] | configuration.ConfigurationRawPayload[] | undefined>;
    dashboardConfigurations({ query: { owner }, ...rest }: {
        query: {
            owner: string;
        };
        [key: string]: any;
    }): Promise<configuration.Configuration[] | configuration.ConfigurationRawPayload[] | undefined>;
    inventories(options?: EntityFetchOptions): Promise<inventory.Inventory[] | inventory.InventoryRawPayload[] | undefined>;
    integrations(options?: EntityFetchOptions): Promise<integration.Integration[] | integration.IntegrationRawPayload[] | undefined>;
    availableIntegrations(options?: EntityFetchOptions): Promise<integration.AvailableIntegrationRawPayload[] | undefined>;
    setupIntegration(payload: object, setupEndpoint: string): Promise<number | undefined>;
    messageBrokers(options?: EntityFetchOptions): Promise<messageBroker.MessageBroker[] | messageBroker.MessageBrokerRawPayload[] | undefined>;
    storefronts(options?: EntityFetchOptions): Promise<storefront.Storefront[] | storefront.StorefrontRawPayload[] | undefined>;
    shippingMethods(options?: EntityFetchOptions): Promise<shippingMethod.ShippingMethod[] | shippingMethod.ShippingMethodRawPayload[] | undefined>;
    routes(options?: EntityFetchOptions): Promise<route.Route[] | route.RouteRawPayload[] | undefined>;
    things(options?: EntityFetchOptions): Promise<thing.Thing[] | thing.ThingRawPayload[] | undefined>;
    nlus(options?: EntityFetchOptions): Promise<nlu.Nlu[] | nlu.NluRawPayload[] | undefined>;
    intents(options?: EntityFetchOptions): Promise<intent.Intent[] | intent.IntentRawPayload[] | undefined>;
    locations(options?: EntityFetchOptions): Promise<location.Location[] | location.LocationRawPayload[] | undefined>;
    get contactLists(): IUniverseContactLists;
    get notificationCampaigns(): IUniverseNotificationCampaigns;
    favorites(options?: EntityFetchOptions): Promise<favorite.Favorite[] | favorite.FavoriteRawPayload[] | undefined>;
    knowledgeBases(options?: EntityFetchOptions): Promise<knowledgeBase.KnowledgeBase[] | knowledgeBase.KnowledgeBaseRawPayload[] | undefined>;
    crms(options?: EntityFetchOptions): Promise<crm.CRM[] | crm.CRMRawPayload[] | undefined>;
    get deals(): IUniverseDeals;
    messageSubscriptions(options?: EntityFetchOptions): Promise<messageSubscription.MessageSubscription[] | messageSubscription.MessageSubscriptionRawPayload[] | undefined>;
    messageSubscriptionInstances(options?: EntityFetchOptions): Promise<messageSubscriptionInstance.MessageSubscriptionInstance[] | messageSubscriptionInstance.MessageSubscriptionInstanceRawPayload[] | undefined>;
    peopleOrganizations(options?: EntityFetchOptions): Promise<peopleOrganization.PeopleOrganization[] | peopleOrganization.PeopleOrganizationRawPayload[] | undefined>;
    urlShorteners(options?: EntityFetchOptions): Promise<urlShortener.UrlShortener[] | urlShortener.UrlShortenerRawPayload[] | undefined>;
    apiKeys(options?: EntityFetchOptions): Promise<apiKey.ApiKey[] | apiKey.ApiKeyRawPayload[] | undefined>;
    arm(): Universe;
    versions(): Promise<{
        universe: string;
    } | undefined>;
    selfV0(): Promise<{
        universe: string;
    } | undefined>;
    self(): Promise<{
        [key: string]: any;
    } | undefined>;
    healthz(): Promise<{
        message: string;
    } | undefined>;
    get search(): UniverseSearches;
    private searchEntity;
}
export declare class UnviverseSingleton extends Universe {
    private static instance;
    static getInstance(options: UniverseOptions): Universe;
    static clearInstance(): void;
}
export declare class UniverseInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseSearchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseApiRequestError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseVersionsError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseSelfError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseHealthzError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
