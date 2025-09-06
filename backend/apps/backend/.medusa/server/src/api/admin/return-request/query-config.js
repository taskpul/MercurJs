"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminReturnOrderRequestQueryConfig = exports.adminReturnOrderRequestFields = void 0;
exports.adminReturnOrderRequestFields = [
    'id',
    'customer_id',
    'customer_note',
    'vendor_reviewer_id',
    'vendor_reviewer_note',
    'vendor_reviewer_date',
    'admin_reviewer_id',
    'admin_reviewer_note',
    'admin_reviewer_date',
    'status',
    'line_items.*',
    'order.*',
    'order.customer.first_name',
    'order.customer.last_name',
    'seller.*',
    'created_at'
];
exports.adminReturnOrderRequestQueryConfig = {
    list: {
        defaults: exports.adminReturnOrderRequestFields,
        isList: true
    },
    retrieve: {
        defaults: exports.adminReturnOrderRequestFields,
        isList: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9hZG1pbi9yZXR1cm4tcmVxdWVzdC9xdWVyeS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSw2QkFBNkIsR0FBRztJQUMzQyxJQUFJO0lBQ0osYUFBYTtJQUNiLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixRQUFRO0lBQ1IsY0FBYztJQUNkLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLFVBQVU7SUFDVixZQUFZO0NBQ2IsQ0FBQTtBQUVZLFFBQUEsa0NBQWtDLEdBQUc7SUFDaEQsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLHFDQUE2QjtRQUN2QyxNQUFNLEVBQUUsSUFBSTtLQUNiO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsUUFBUSxFQUFFLHFDQUE2QjtRQUN2QyxNQUFNLEVBQUUsS0FBSztLQUNkO0NBQ0YsQ0FBQSJ9