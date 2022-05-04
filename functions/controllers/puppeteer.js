"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromTwitter = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _puppeteerServices = require("../services/puppeteerServices");

var _puppeteerCluster = require("puppeteer-cluster");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-await */
const userDir = _path.default.resolve('./userDataDir');

const twitDir = _path.default.resolve('./twitter');
/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
// eslint-disable-next-line require-await


const fromTwitter = async (req, res, next) => {
  req.setTimeout(300000);
  const cluster = await _puppeteerCluster.Cluster.launch({
    concurrency: _puppeteerCluster.Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    puppeteerOptions: {
      userDataDir: userDir
    },
    monitor: true,
    timeout: 300000
  }); // define your task (in this example we extract the title of the given page)

  await cluster.task(async ({
    page,
    data
  }) => {
    const img = await (0, _puppeteerServices.getTwitImg)(page, data.link);
    await (0, _puppeteerServices.postToFacebook)(page, process.env.FB_USER, process.env.FB_PASS, img);
    await (0, _puppeteerServices.postToInstagram)(page, process.env.IG_USER, process.env.IG_PASS, img, data.caption); // delete image after successful post

    await _fs.default.unlinkSync(twitDir + '/' + img);
  }); // eslint-disable-next-line no-console

  console.log('Queued. Thank you!');

  try {
    // eslint-disable-next-line no-console
    const data = req.body;
    await cluster.execute(data);
    res.status(_httpStatusCodes.default.ACCEPTED).send({
      message: "Queued. Thank you!"
    });
  } catch (error) {
    next(error);
  } finally {
    await cluster.idle();
    await cluster.close();
  }
};

exports.fromTwitter = fromTwitter;
//# sourceMappingURL=puppeteer.js.map