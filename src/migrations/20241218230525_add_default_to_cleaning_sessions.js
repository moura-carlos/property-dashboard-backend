/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("cleaning_sessions", (table) => {
    table.timestamp("start_time").defaultTo(knex.fn.now()).alter();
    table.timestamp("end_time").defaultTo(knex.fn.now()).alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("cleaning_sessions", (table) => {
    table.timestamp("start_time").alter();
    table.timestamp("end_time").alter();
  });
};
