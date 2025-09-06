import { MedusaContainer } from '@medusajs/framework';
export declare function getAvgRating(container: MedusaContainer, type: 'seller' | 'product', id: string): Promise<string | null>;
export declare function getSellersWithRating(container: MedusaContainer, fields: string[]): Promise<any[]>;
export declare function getProductsWithRating(container: MedusaContainer, fields: string[]): Promise<any[]>;
//# sourceMappingURL=utils.d.ts.map