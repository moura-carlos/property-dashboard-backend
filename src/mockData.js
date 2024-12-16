/**
 * this is where mock data for testing in development will go
 *
 */
const hosts = [
  {
    id: "1",
    name: "Alice",
    properties: ["1", "2"],
  },
];

const properties = [
  {
    id: "1",
    name: "Cozy Cabin",
    address: "123 Forest Lane",
    hostId: "1",
  },
  {
    id: "2",
    name: "Beach House",
    address: "456 Ocean Ave",
    hostId: "1",
  },
];

const cleaners = [
  {
    id: "1",
    name: "Bob",
    cleaningSessions: ["1"],
  },
];

const cleaningSessions = [
  {
    id: "1",
    propertyId: "1",
    cleanerId: "1",
    tasks: ["Sweep floors", "Change linens"],
    startTime: "2024-12-01T10:00:00Z",
    endTime: "2024-12-01T12:00:00Z",
    notes: "Check lightbulbs",
  },
];

module.exports = { hosts, properties, cleaners, cleaningSessions };
