/**
 * Tenant scoped service ensures that all read and write operations
 * are automatically filtered by the current tenant id. The tenant
 * id must be provided in the context object passed to the methods.
 */
export declare const TenantScopedService: (models: any) => {
    new (...args: any[]): {
        [x: `retrieve${Capitalize<string>}`]: (id: string, config?: import("@medusajs/types").FindConfig<any> | undefined, sharedContext?: import("@medusajs/types").Context) => Promise<any>;
        [x: `list${Capitalize<string>}s`]: (filters?: any, config?: import("@medusajs/types").FindConfig<any> | undefined, sharedContext?: import("@medusajs/types").Context) => Promise<any[]>;
        [x: `listAndCount${Capitalize<string>}s`]: (filters?: any, config?: import("@medusajs/types").FindConfig<any> | undefined, sharedContext?: import("@medusajs/types").Context) => Promise<[any[], number]>;
        [x: `delete${Capitalize<string>}s`]: (primaryKeyValues: string | object | string[] | object[], sharedContext?: import("@medusajs/types").Context) => Promise<void>;
        [x: `softDelete${Capitalize<string>}s`]: <TReturnableLinkableKeys extends string>(primaryKeyValues: string | object | string[] | object[], config?: import("@medusajs/types").SoftDeleteReturn<TReturnableLinkableKeys>, sharedContext?: import("@medusajs/types").Context) => Promise<Record<string, string[]> | void>;
        [x: `restore${Capitalize<string>}s`]: <TReturnableLinkableKeys extends string>(primaryKeyValues: string | object | string[] | object[], config?: import("@medusajs/types").RestoreReturn<TReturnableLinkableKeys>, sharedContext?: import("@medusajs/types").Context) => Promise<Record<string, string[]> | void>;
        [x: `create${Capitalize<string>}s`]: {
            (data: {
                [x: string]: any;
            }, ...rest: any[]): Promise<any>;
            (data: {
                [x: string]: any;
            }[], ...rest: any[]): Promise<any[]>;
        };
        [x: `update${Capitalize<string>}s`]: {
            (data: {
                [x: string]: any;
            }, ...rest: any[]): Promise<any>;
            (dataOrOptions: {
                [x: string]: any;
            }[] | {
                selector: Record<string, any>;
                data: {
                    [x: string]: any;
                } | {
                    [x: string]: any;
                }[];
            } | {
                selector: Record<string, any>;
                data: {
                    [x: string]: any;
                } | {
                    [x: string]: any;
                }[];
            }[], ...rest: any[]): Promise<any[]>;
        };
        getTenant(context: any): string | undefined;
        list(selector?: any, config?: any, context?: any): Promise<any>;
        retrieve(id: string, config?: any, context?: any): Promise<any>;
        create(data: any, context?: any): Promise<any>;
    };
    $modelObjects: {
        [x: string]: any;
    };
    aggregatedEvents({ action, object, eventName, source, data, context, }: {
        action: string;
        object: string;
        eventName: string;
        source?: string;
        data: {
            id: any;
        } | {
            id: any;
        }[];
        context: import("@medusajs/types").Context;
    }): void;
};
/**
 * Higher order function that augments an existing service class so that
 * read and write operations are automatically scoped to the provided
 * tenant id. This is useful when extending core Medusa services.
 */
export declare const withTenantScope: <T extends new (...args: any[]) => any>(Base: T) => {
    new (...args: any[]): {
        [x: string]: any;
        getTenant(context: any): string | undefined;
        list(selector?: any, config?: any, context?: any): Promise<any>;
        retrieve(id: string, config?: any, context?: any): Promise<any>;
        create(data: any, context?: any): Promise<any>;
    };
} & T;
//# sourceMappingURL=tenant.d.ts.map