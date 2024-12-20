/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("hosts", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("properties", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.integer("host_id").references("id").inTable("hosts");
    })
    .createTable("cleaners", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("cleaning_sessions", (table) => {
      table.increments("id").primary();
      table.integer("property_id").references("id").inTable("properties");
      table.integer("cleaner_id").references("id").inTable("cleaners");
      table.jsonb("tasks").notNullable(); // Stores tasks as a JSON array
      table.timestamp("start_time").notNullable();
      table.timestamp("end_time").notNullable();
      table.string("notes");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cleaning_sessions")
    .dropTableIfExists("cleaners")
    .dropTableIfExists("properties")
    .dropTableIfExists("hosts");
};
