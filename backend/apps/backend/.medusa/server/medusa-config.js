"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            // @ts-expect-error: vendorCors is not a valid config
            vendorCors: process.env.VENDOR_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret: process.env.JWT_SECRET || 'supersecret',
            cookieSecret: process.env.COOKIE_SECRET || 'supersecret'
        }
    },
    modules: [
        { resolve: '@mercurjs/seller' },
        { resolve: '@mercurjs/reviews' },
        { resolve: '@mercurjs/marketplace' },
        { resolve: '@mercurjs/configuration' },
        { resolve: '@mercurjs/order-return-request' },
        { resolve: '@mercurjs/requests' },
        { resolve: '@mercurjs/brand' },
        { resolve: '@mercurjs/wishlist' },
        { resolve: '@mercurjs/split-order-payment' },
        { resolve: '@mercurjs/attribute' },
        {
            resolve: '@mercurjs/taxcode',
            options: {
                apiKey: process.env.STRIPE_SECRET_API_KEY
            }
        },
        { resolve: '@mercurjs/commission' },
        {
            resolve: '@mercurjs/payout',
            options: {
                apiKey: process.env.STRIPE_SECRET_API_KEY,
                webhookSecret: process.env.STRIPE_CONNECTED_ACCOUNTS_WEBHOOK_SECRET
            }
        },
        {
            resolve: '@mercurjs/algolia',
            options: {
                apiKey: process.env.ALGOLIA_API_KEY,
                appId: process.env.ALGOLIA_APP_ID
            }
        },
        {
            resolve: '@medusajs/medusa/payment',
            options: {
                providers: [
                    {
                        resolve: '@mercurjs/payment-stripe-connect',
                        id: 'stripe-connect',
                        options: {
                            apiKey: process.env.STRIPE_SECRET_API_KEY
                        }
                    }
                ]
            }
        },
        {
            resolve: '@medusajs/medusa/notification',
            options: {
                providers: [
                    {
                        resolve: '@mercurjs/resend',
                        id: 'resend',
                        options: {
                            channels: ['email'],
                            api_key: process.env.RESEND_API_KEY,
                            from: process.env.RESEND_FROM_EMAIL
                        }
                    },
                    {
                        resolve: '@medusajs/medusa/notification-local',
                        id: 'local',
                        options: {
                            channels: ['feed', 'seller_feed']
                        }
                    }
                ]
            }
        }
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLHFEQUFxRDtZQUNyRCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFZO1lBQ3BDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVU7WUFDaEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGFBQWE7WUFDbEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGFBQWE7U0FDekQ7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFO1FBQy9CLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFO1FBQ2hDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFO1FBQ3BDLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFO1FBQ3RDLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFO1FBQzdDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFO1FBQ2pDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFO1FBQzlCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFO1FBQ2pDLEVBQUUsT0FBTyxFQUFFLCtCQUErQixFQUFFO1FBQzVDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFO1FBQ2xDO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO2FBQzFDO1NBQ0Y7UUFDRCxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTtRQUNuQztZQUNFLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQjtnQkFDekMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDO2FBQ3BFO1NBQ0Y7UUFDRDtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWU7Z0JBQ25DLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7YUFDbEM7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxrQ0FBa0M7d0JBQzNDLEVBQUUsRUFBRSxnQkFBZ0I7d0JBQ3BCLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7eUJBQzFDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxrQkFBa0I7d0JBQzNCLEVBQUUsRUFBRSxRQUFRO3dCQUNaLE9BQU8sRUFBRTs0QkFDUCxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUM7NEJBQ25CLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7NEJBQ25DLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjt5QkFDcEM7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsT0FBTyxFQUFFLHFDQUFxQzt3QkFDOUMsRUFBRSxFQUFFLE9BQU87d0JBQ1gsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7eUJBQ2xDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=