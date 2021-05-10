const ChoreCurrencyController = require('./controllers/choreCurrency.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const ADMIN = PermissionMiddleware.permissionLevels.ADMIN;
const PAID = PermissionMiddleware.permissionLevels.PAID_USER;
const FREE = PermissionMiddleware.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/choreCurrency', [
        ChoreCurrencyController.insert
    ]);
    app.get('/choreCurrency', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ChoreCurrencyController.list
    ]);
    app.get('/choreCurrency/:choreCurrencyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ChoreCurrencyController.getById
    ]);
    app.get('/users/:userId/choreCurrency', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ChoreCurrencyController.getByUserId
    ]);
    app.post('/choreCurrency/:choreCurrencyId/add', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ChoreCurrencyController.addToChoreCurrency
    ]);
    app.post('/choreCurrency/:choreCurrencyId/assign', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ChoreCurrencyController.assignChoreCurrency
    ]);
    app.patch('/choreCurrency/:choreCurrencyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ChoreCurrencyController.patchById
    ]);
    app.delete('/choreCurrency/:choreCurrencyId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ChoreCurrencyController.removeById
    ]);
};
