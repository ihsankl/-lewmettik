"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logStream = exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _winston = _interopRequireWildcard(require("winston"));

var _path = _interopRequireDefault(require("path"));

require("winston-daily-rotate-file");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logDir = _path.default.resolve('./logs');

// Use LOG_DIR from env
const LOG_DIR = process.env.LOG_DIR || logDir;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'; // Create log directory if it does not exist

if (!_fs.default.existsSync(LOG_DIR)) {
  _fs.default.mkdirSync(LOG_DIR);
}
/**
 * Create a new winston logger.
 */


const logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.Console({
    format: _winston.format.combine(_winston.format.colorize(), _winston.format.simple()),
    level: 'info'
  }), new _winston.default.transports.DailyRotateFile({
    format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json()),
    maxFiles: '14d',
    level: LOG_LEVEL,
    dirname: LOG_DIR,
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%-debug.log'
  })]
});

const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }

};
exports.logStream = logStream;
var _default = logger;
exports.default = _default;
//# sourceMappingURL=logger.js.map