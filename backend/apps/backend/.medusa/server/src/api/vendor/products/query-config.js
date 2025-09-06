"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorProductQueryConfig = exports.vendorProductFields = void 0;
exports.vendorProductFields = [
    'id',
    'title',
    'subtitle',
    'status',
    'external_id',
    'description',
    'handle',
    'is_giftcard',
    'discountable',
    'thumbnail',
    'collection_id',
    'type_id',
    'weight',
    'length',
    'height',
    'width',
    'hs_code',
    'origin_country',
    'mid_code',
    'material',
    'metadata',
    'brand.name',
    '*type',
    '*collection',
    '*options',
    '*options.values',
    '*tags',
    '*images',
    '*variants',
    '*variants.prices',
    'variants.prices.price_rules.value',
    'variants.prices.price_rules.attribute',
    '*variants.options',
    '*attribute_values',
    '*attribute_values.attribute'
];
exports.vendorProductQueryConfig = {
    list: {
        defaults: exports.vendorProductFields,
        isList: true
    },
    retrieve: {
        defaults: exports.vendorProductFields,
        isList: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92ZW5kb3IvcHJvZHVjdHMvcXVlcnktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsSUFBSTtJQUNKLE9BQU87SUFDUCxVQUFVO0lBQ1YsUUFBUTtJQUNSLGFBQWE7SUFDYixhQUFhO0lBQ2IsUUFBUTtJQUNSLGFBQWE7SUFDYixjQUFjO0lBQ2QsV0FBVztJQUNYLGVBQWU7SUFDZixTQUFTO0lBQ1QsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsT0FBTztJQUNQLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsWUFBWTtJQUNaLE9BQU87SUFDUCxhQUFhO0lBQ2IsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixPQUFPO0lBQ1AsU0FBUztJQUNULFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLHVDQUF1QztJQUN2QyxtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLDZCQUE2QjtDQUM5QixDQUFBO0FBRVksUUFBQSx3QkFBd0IsR0FBRztJQUN0QyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsMkJBQW1CO1FBQzdCLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsMkJBQW1CO1FBQzdCLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7Q0FDRixDQUFBIn0=