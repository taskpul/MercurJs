"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorOnboardingQueryConfig = exports.vendorOnboardingFields = exports.vendorReviewQueryConfig = exports.vendorReviewFields = exports.vendorSellerQueryConfig = exports.vendorSellerFields = void 0;
exports.vendorSellerFields = [
    'id',
    'store_status',
    'name',
    'handle',
    'description',
    'photo',
    'address_line',
    'city',
    'postal_code',
    'country_code',
    'tax_id'
];
exports.vendorSellerQueryConfig = {
    list: {
        defaults: exports.vendorSellerFields,
        isList: true
    },
    retrieve: {
        defaults: exports.vendorSellerFields,
        isList: false
    }
};
exports.vendorReviewFields = [
    'id',
    'rating',
    'customer_note',
    'customer_id',
    'seller_note',
    'created_at',
    'updated_at'
];
exports.vendorReviewQueryConfig = {
    list: {
        defaults: exports.vendorReviewFields,
        isList: true
    },
    retrieve: {
        defaults: exports.vendorReviewFields,
        isList: false
    }
};
exports.vendorOnboardingFields = [
    'id',
    'seller_id',
    'store_information',
    'stripe_connection',
    'locations_shipping',
    'products',
    'created_at',
    'updated_at'
];
exports.vendorOnboardingQueryConfig = {
    retrieve: {
        defaults: exports.vendorOnboardingFields,
        isList: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92ZW5kb3Ivc2VsbGVycy9xdWVyeS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxrQkFBa0IsR0FBRztJQUNoQyxJQUFJO0lBQ0osY0FBYztJQUNkLE1BQU07SUFDTixRQUFRO0lBQ1IsYUFBYTtJQUNiLE9BQU87SUFDUCxjQUFjO0lBQ2QsTUFBTTtJQUNOLGFBQWE7SUFDYixjQUFjO0lBQ2QsUUFBUTtDQUNULENBQUE7QUFFWSxRQUFBLHVCQUF1QixHQUFHO0lBQ3JDLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRSwwQkFBa0I7UUFDNUIsTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSwwQkFBa0I7UUFDNUIsTUFBTSxFQUFFLEtBQUs7S0FDZDtDQUNGLENBQUE7QUFFWSxRQUFBLGtCQUFrQixHQUFHO0lBQ2hDLElBQUk7SUFDSixRQUFRO0lBQ1IsZUFBZTtJQUNmLGFBQWE7SUFDYixhQUFhO0lBQ2IsWUFBWTtJQUNaLFlBQVk7Q0FDYixDQUFBO0FBRVksUUFBQSx1QkFBdUIsR0FBRztJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsMEJBQWtCO1FBQzVCLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsMEJBQWtCO1FBQzVCLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7Q0FDRixDQUFBO0FBRVksUUFBQSxzQkFBc0IsR0FBRztJQUNwQyxJQUFJO0lBQ0osV0FBVztJQUNYLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixZQUFZO0lBQ1osWUFBWTtDQUNiLENBQUE7QUFFWSxRQUFBLDJCQUEyQixHQUFHO0lBQ3pDLFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRSw4QkFBc0I7UUFDaEMsTUFBTSxFQUFFLEtBQUs7S0FDZDtDQUNGLENBQUEifQ==