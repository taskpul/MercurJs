import { IndexSettings } from "algoliasearch";
import { IndexType, AlgoliaEntity } from "@mercurjs/framework";
type ModuleOptions = {
    appId: string;
    apiKey: string;
};
export declare const defaultProductSettings: IndexSettings;
export declare const defaultReviewSettings: IndexSettings;
declare class AlgoliaModuleService {
    private options_;
    private algolia_;
    constructor(_: any, options: ModuleOptions);
    getAppId(): string;
    checkIndex(index: IndexType): Promise<boolean>;
    updateSettings(index: IndexType, settings: IndexSettings): Promise<import("algoliasearch").UpdatedAtResponse>;
    batch(type: IndexType, toAdd: AlgoliaEntity[], toDelete: string[]): Promise<import("algoliasearch").BatchResponse>;
    batchUpsert(type: IndexType, entities: AlgoliaEntity[]): Promise<import("algoliasearch").BatchResponse>;
    batchDelete(type: IndexType, ids: string[]): Promise<import("algoliasearch").BatchResponse>;
    upsert(type: IndexType, entity: AlgoliaEntity): Promise<import("algoliasearch").UpdatedAtWithObjectIdResponse>;
    delete(type: IndexType, id: string): Promise<import("algoliasearch").DeletedAtResponse>;
    partialUpdate(type: IndexType, entity: Partial<AlgoliaEntity> & {
        id: string;
    }): Promise<import("algoliasearch").UpdatedAtWithObjectIdResponse>;
}
export default AlgoliaModuleService;
//# sourceMappingURL=service.d.ts.map