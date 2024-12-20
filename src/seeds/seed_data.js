/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
// };
exports.seed = function (knex) {
  // Clear tables in the correct order
  return knex("cleaning_sessions")
    .del()
    .then(() => knex("properties").del())
    .then(() => knex("hosts").del())
    .then(() => knex("cleaners").del())
    .then(() => {
      // Insert hosts
      return knex("hosts").insert([{ id: 1, name: "Alice" }]);
    })
    .then(() => {
      // Insert properties
      return knex("properties").insert([
        { id: 1, name: "Cozy Cabin", address: "123 Forest Lane", host_id: 1 },
        { id: 2, name: "Beach House", address: "456 Ocean Ave", host_id: 1 },
        { id: 3, name: "Mountain Lodge", address: "789 Pine Hill", host_id: 1 },
      ]);
    })
    .then(() => {
      // Insert cleaners
      return knex("cleaners").insert([{ id: 1, name: "Bob" }]);
    })
    .then(() => {
      // Insert cleaning sessions
      return knex("cleaning_sessions").insert([
        {
          id: 1,
          property_id: 1,
          cleaner_id: 1,
          tasks: JSON.stringify(["Sweep floors", "Change linens"]),
          start_time: "2024-12-01T10:00:00Z",
          end_time: "2024-12-01T12:00:00Z",
          notes: "Check lightbulbs",
        },
        {
          id: 2,
          property_id: 2,
          cleaner_id: 1,
          tasks: JSON.stringify(["Mop floors", "Restock towels"]),
          start_time: "2024-12-02T08:30:00Z",
          end_time: "2024-12-02T10:00:00Z",
          notes: "Refilled kitchen supplies",
        },
        {
          id: 3,
          property_id: 3,
          cleaner_id: 1,
          tasks: JSON.stringify(["Dust furniture", "Clean windows"]),
          start_time: "2024-12-03T09:00:00Z",
          end_time: "2024-12-03T11:30:00Z",
          notes: "Noted broken window lock",
        },
      ]);
    });
};
