"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const commission_1 = require("@mercurjs/commission");
const workflows_1 = require("../../../../workflows/commission/workflows");
async function GET(req, res) {
    const service = req.scope.resolve(commission_1.COMMISSION_MODULE);
    const ids = await service.listCommissionRules({
        q: req.query.q
    }, { select: ['id'] });
    const { result } = await workflows_1.listCommissionRulesWorkflow.run({
        container: req.scope,
        input: {
            ids: ids.map((v) => v.id),
            pagination: req.queryConfig.pagination
        }
    });
    res.json({
        commission_rules: result.commission_rules,
        count: result.count,
        offset: req.queryConfig.pagination.skip,
        limit: req.queryConfig.pagination.take
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2NvbW1pc3Npb24vc2VhcmNoL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0Esa0JBMkJDO0FBaENELHFEQUF3RDtBQUd4RCwwRUFBd0Y7QUFFakYsS0FBSyxVQUFVLEdBQUcsQ0FDdkIsR0FBa0IsRUFDbEIsR0FBbUI7SUFFbkIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQTBCLDhCQUFpQixDQUFDLENBQUE7SUFFN0UsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsbUJBQW1CLENBQzNDO1FBQ0UsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNmLEVBQ0QsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNuQixDQUFBO0lBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sdUNBQTJCLENBQUMsR0FBRyxDQUFDO1FBQ3ZELFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztRQUNwQixLQUFLLEVBQUU7WUFDTCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QixVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVO1NBQ3ZDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDekMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQ25CLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJO1FBQ3ZDLEtBQUssRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJO0tBQ3ZDLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==