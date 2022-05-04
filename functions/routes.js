"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _swagger = _interopRequireDefault(require("./utils/swagger"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _puppeteerRoutes = _interopRequireDefault(require("./routes/puppeteerRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains all API routes for the application.
 */
const router = (0, _express.Router)();
/**
 * GET /api/swagger.json.
 */

router.get('/swagger.json', (req, res) => {
  res.json(_swagger.default);
});
/**
 * GET /api.
 */

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});
router.use('/users', _userRoutes.default);
router.use('/puppeteer', _puppeteerRoutes.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map