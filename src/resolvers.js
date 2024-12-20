const knex = require("knex")(require("../knexfile").development); // Use Knex for PostgreSQL connection

const resolvers = {
  // Define Query resolvers to fetch data
  Query: {
    // Fetch all cleaning sessions with optional filters
    cleaningSessions: async (_, { filter }) => {
      let query = knex("cleaning_sessions");

      if (filter?.propertyId) {
        query = query.where("property_id", filter.propertyId);
      }
      if (filter?.cleanerId) {
        query = query.where("cleaner_id", filter.cleanerId);
      }
      if (filter?.start) {
        query = query.where("start_time", ">=", filter.start);
      }
      if (filter?.end) {
        query = query.where("end_time", "<=", filter.end);
      }

      return await query;
    },

    // Fetch all properties
    properties: async () => {
      return await knex("properties").select("*");
    },

    // Fetch all hosts
    hosts: async () => {
      return await knex("hosts").select("*");
    },

    // Fetch all cleaners
    cleaners: async () => {
      return await knex("cleaners").select("*");
    },
  },

  // Define relationships for the Host type
  Host: {
    properties: async (host) => {
      return await knex("properties").where("host_id", host.id);
    },
  },

  // Define relationships for the Property type
  Property: {
    host: async (property) => {
      return await knex("hosts").where("id", property.host_id).first();
    },
  },

  // Define relationships for the Cleaner type
  Cleaner: {
    cleaningSessions: async (cleaner) => {
      return await knex("cleaning_sessions").where("cleaner_id", cleaner.id);
    },
  },

  // Define relationships for the CleaningSession type
  CleaningSession: {
    startTime: (session) => session.start_time || new Date().toISOString(),
    endTime: (session) => session.end_time || new Date().toISOString(),
    property: async (session) => {
      return await knex("properties").where("id", session.property_id).first();
    },
    cleaner: async (session) => {
      return await knex("cleaners").where("id", session.cleaner_id).first();
    },
  },

  // Define Mutation resolvers
  Mutation: {
    // Add a new cleaning session
    logCleaningSession: async (_, { input }) => {
      const [newSession] = await knex("cleaning_sessions")
        .insert({
          property_id: input.propertyId,
          cleaner_id: input.cleanerId,
          tasks: JSON.stringify(input.tasks), // Convert tasks array to JSON
          start_time: input.startTime,
          end_time: input.endTime,
          notes: input.notes,
        })
        .returning("*");
      return newSession;
    },

    // Update a cleaning session
    updateCleaningSession: async (_, { id, input }) => {
      const [updatedSession] = await knex("cleaning_sessions")
        .where("id", id)
        .update({
          property_id: input.propertyId,
          cleaner_id: input.cleanerId,
          tasks: JSON.stringify(input.tasks),
          start_time: input.startTime,
          end_time: input.endTime,
          notes: input.notes,
        })
        .returning("*");

      if (!updatedSession) {
        throw new Error(`CleaningSession with ID ${id} not found`);
      }
      return updatedSession;
    },

    // Delete a cleaning session
    deleteCleaningSession: async (_, { id }) => {
      const deletedCount = await knex("cleaning_sessions")
        .where("id", id)
        .del();
      return deletedCount > 0; // Return true if a row was deleted
    },
  },
};

module.exports = resolvers;
