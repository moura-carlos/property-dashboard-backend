/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("cleaning_sessions", (table) => {
    table.timestamp("start_time").notNullable().alter();
    table.timestamp("end_time").notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("cleaning_sessions", (table) => {
    table.timestamp("start_time").nullable().alter();
    table.timestamp("end_time").nullable().alter();
  });
};
