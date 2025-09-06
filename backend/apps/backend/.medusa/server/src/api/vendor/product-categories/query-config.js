"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorProductCategoryQueryConfig = exports.vendorProductCategoryFields = void 0;
exports.vendorProductCategoryFields = [
    'id',
    'name',
    'description',
    'handle',
    'rank',
    'parent_category_id',
    'created_at',
    'updated_at',
    'metadata',
    '*parent_category',
    '*category_children'
];
exports.vendorProductCategoryQueryConfig = {
    list: {
        defaults: exports.vendorProductCategoryFields,
        isList: true
    },
    retrieve: {
        defaults: exports.vendorProductCategoryFields,
        isList: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92ZW5kb3IvcHJvZHVjdC1jYXRlZ29yaWVzL3F1ZXJ5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLDJCQUEyQixHQUFHO0lBQ3pDLElBQUk7SUFDSixNQUFNO0lBQ04sYUFBYTtJQUNiLFFBQVE7SUFDUixNQUFNO0lBQ04sb0JBQW9CO0lBQ3BCLFlBQVk7SUFDWixZQUFZO0lBQ1osVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixvQkFBb0I7Q0FDckIsQ0FBQTtBQUVZLFFBQUEsZ0NBQWdDLEdBQUc7SUFDOUMsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLG1DQUEyQjtRQUNyQyxNQUFNLEVBQUUsSUFBSTtLQUNiO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLG1DQUEyQjtRQUNyQyxNQUFNLEVBQUUsS0FBSztLQUNkO0NBQ0YsQ0FBQSJ9