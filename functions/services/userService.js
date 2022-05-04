"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all users.
 *
 * @returns {Promise}
 */
function getAllUsers() {
  return _user.default.fetchAll();
}
/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */


function getUser(id) {
  return new _user.default({
    id
  }).fetch().then(user => user).catch(_user.default.NotFoundError, () => {
    throw _boom.default.notFound('User not found');
  });
}
/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */


function createUser(user) {
  return new _user.default({
    name: user.name
  }).save();
}
/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */


function updateUser(id, user) {
  return new _user.default({
    id
  }).save({
    name: user.name
  });
}
/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */


function deleteUser(id) {
  return new _user.default({
    id
  }).fetch().then(user => user.destroy());
}
//# sourceMappingURL=userService.js.map