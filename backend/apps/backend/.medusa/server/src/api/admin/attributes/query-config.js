"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAttributeValueQueryConfig = exports.retrieveAttributeValueQueryConfig = exports.defaultAdminAttributeValueFields = exports.listAttributeQueryConfig = exports.retrieveAttributeQueryConfig = exports.defaultAdminAttributeFields = void 0;
exports.defaultAdminAttributeFields = [
    'id',
    'name',
    'description',
    'handle',
    'is_filterable',
    'ui_component',
    'metadata',
    '*possible_values',
    'product_categories.id',
    'product_categories.name'
];
exports.retrieveAttributeQueryConfig = {
    defaults: exports.defaultAdminAttributeFields,
    isList: false
};
exports.listAttributeQueryConfig = {
    ...exports.retrieveAttributeQueryConfig,
    defaultLimit: 50,
    isList: true
};
exports.defaultAdminAttributeValueFields = [
    'id',
    'value',
    'rank',
    'metadata'
];
exports.retrieveAttributeValueQueryConfig = {
    defaults: exports.defaultAdminAttributeValueFields,
    isList: false
};
exports.listAttributeValueQueryConfig = {
    ...exports.retrieveAttributeValueQueryConfig,
    isList: true,
    defaultLimit: 50
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9hZG1pbi9hdHRyaWJ1dGVzL3F1ZXJ5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLDJCQUEyQixHQUFHO0lBQ3pDLElBQUk7SUFDSixNQUFNO0lBQ04sYUFBYTtJQUNiLFFBQVE7SUFDUixlQUFlO0lBQ2YsY0FBYztJQUNkLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtDQUMxQixDQUFBO0FBRVksUUFBQSw0QkFBNEIsR0FBRztJQUMxQyxRQUFRLEVBQUUsbUNBQTJCO0lBQ3JDLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQTtBQUVZLFFBQUEsd0JBQXdCLEdBQUc7SUFDdEMsR0FBRyxvQ0FBNEI7SUFDL0IsWUFBWSxFQUFFLEVBQUU7SUFDaEIsTUFBTSxFQUFFLElBQUk7Q0FDYixDQUFBO0FBRVksUUFBQSxnQ0FBZ0MsR0FBRztJQUM5QyxJQUFJO0lBQ0osT0FBTztJQUNQLE1BQU07SUFDTixVQUFVO0NBQ1gsQ0FBQTtBQUVZLFFBQUEsaUNBQWlDLEdBQUc7SUFDL0MsUUFBUSxFQUFFLHdDQUFnQztJQUMxQyxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUE7QUFFWSxRQUFBLDZCQUE2QixHQUFHO0lBQzNDLEdBQUcseUNBQWlDO0lBQ3BDLE1BQU0sRUFBRSxJQUFJO0lBQ1osWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQSJ9