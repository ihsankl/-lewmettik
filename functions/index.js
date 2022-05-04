"use strict";

require("./env");

require("./db");

var _fs = _interopRequireDefault(require("fs"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _routes = _interopRequireDefault(require("./routes"));

var _json = _interopRequireDefault(require("./middlewares/json"));

var _logger = _interopRequireWildcard(require("./utils/logger"));

var errorHandler = _interopRequireWildcard(require("./middlewares/errorHandler"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import path from 'path';
// import favicon from 'serve-favicon';
const functions = require('firebase-functions'); // Initialize Sentry
// https://docs.sentry.io/platforms/node/express/


Sentry.init({
  dsn: process.env.SENTRY_DSN
});
const app = (0, _express.default)();
const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION; // This request handler must be the first middleware on the app

app.use(Sentry.Handlers.requestHandler()); // app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));

app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _compression.default)());
app.use((0, _morgan.default)('tiny', {
  stream: _logger.logStream
}));
app.use(_bodyParser.default.json());
app.use(errorHandler.bodyParser);
app.use(_json.default); // API Routes

app.use('/api', _routes.default); // Swagger UI
// Workaround for changing the default URL in swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624

const swaggerIndexContent = _fs.default.readFileSync(`${pathToSwaggerUi}/index.html`).toString().replace('https://petstore.swagger.io/v2/swagger.json', '/api/swagger.json');

app.get('/api-docs/index.html', (req, res) => res.send(swaggerIndexContent));
app.get('/api-docs', (req, res) => res.redirect('/api-docs/index.html'));
app.use('/api-docs', _express.default.static(pathToSwaggerUi)); // This error handler must be before any other error middleware

app.use(Sentry.Handlers.errorHandler()); // Error Middleware

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);
app.listen(app.get('port'), app.get('host'), () => {
  _logger.default.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
}); // Catch unhandled rejections

process.on('unhandledRejection', err => {
  _logger.default.error('Unhandled rejection', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    _logger.default.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
}); // Catch uncaught exceptions

process.on('uncaughtException', err => {
  _logger.default.error('Uncaught exception', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    _logger.default.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
});
exports.app = functions.runWith({
  memory: '2GB',
  timeoutSeconds: 540
}).https.onRequest(app);
//# sourceMappingURL=index.js.map