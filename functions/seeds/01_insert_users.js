"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seed = seed;

/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
function seed(knex) {
  return knex('users').del().then(() => {
    return knex('users').insert([{
      name: 'Saugat Acharya',
      updated_at: new Date()
    }, {
      name: 'John Doe',
      updated_at: new Date()
    }]);
  });
}
//# sourceMappingURL=01_insert_users.js.map