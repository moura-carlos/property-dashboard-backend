// Import the mock data from mockData.js
const { hosts, properties, cleaners, cleaningSessions } = require("./mockData");

const resolvers = {
  // Define Query resolvers to fetch data
  Query: {
    // Resolver for fetching filtered cleaning sessions
    cleaningSessions: (_, { filter }) => {
      let results = cleaningSessions; // Start with all cleaning sessions

      // Filter by propertyId if provided
      if (filter?.propertyId) {
        results = results.filter(
          (session) => session.propertyId === filter.propertyId
        );
      }

      // Filter by cleanerId if provided
      if (filter?.cleanerId) {
        results = results.filter(
          (session) => session.cleanerId === filter.cleanerId
        );
      }
      // Filter by date range if start and/or end is provided
      if (filter?.start) {
        results = results.filter(
          (session) => new Date(session.startTime) >= new Date(filter.start)
        );
      }
      if (filter?.end) {
        results = results.filter(
          (session) => new Date(session.endTime) <= new Date(filter.end)
        );
      }

      return results;
    },

    // Resolver for fetching all hosts
    hosts: () => hosts,

    // Resolver for fetching all properties
    properties: () => properties,

    // Resolver for fetching all cleaners
    cleaners: () => cleaners,

    // Resolver for fetching all cleaning sessions
    cleaningSessions: () => cleaningSessions,
  },

  // Define relationships for the Host type
  Host: {
    // Resolver to fetch properties belonging to a specific host
    properties: (host) =>
      // Filter properties where the hostId matches the current host's id
      properties.filter((property) => property.hostId === host.id),
  },

  // Define relationships for the Property type
  Property: {
    // Resolver to fetch the host for a specific property
    host: (property) =>
      // Find the host where the host id matches the hostId of the property
      hosts.find((host) => host.id === property.hostId),
  },

  // Define relationships for the Cleaner type
  Cleaner: {
    // Resolver to fetch cleaning sessions associated with a cleaner
    cleaningSessions: (cleaner) =>
      // Filter cleaning sessions where the session id is in the cleaner's cleaningSessions array
      cleaningSessions.filter((session) =>
        cleaner.cleaningSessions.includes(session.id)
      ),
  },

  // Define relationships for the CleaningSession type
  CleaningSession: {
    // Resolver to fetch the property associated with a cleaning session
    property: (session) =>
      // Find the property where the property id matches the propertyId of the session
      properties.find((property) => property.id === session.propertyId),

    // Resolver to fetch the cleaner associated with a cleaning session
    cleaner: (session) =>
      // Find the cleaner where the cleaner id matches the cleanerId of the session
      cleaners.find((cleaner) => cleaner.id === session.cleanerId),
  },

  Mutation: {
    // Mutation to allow users to create new cleaning sessions.
    logCleaningSession: (_, { input }) => {
      // Generate a new ID
      const newSession = {
        id: (cleaningSessions.length + 1).toString(),
        propertyId: input.propertyId,
        cleanerId: input.cleanerId,
        tasks: input.tasks,
        startTime: input.startTime,
        endTime: input.endTime,
        notes: input.notes,
      };

      // Push the new session to the mock data array
      cleaningSessions.push(newSession);

      return newSession; // Return the newly created session
    },
    // Mutation to Update a Cleaning Session
    updateCleaningSession: (_, { id, input }) => {
      // Find the session to update
      const sessionIndex = cleaningSessions.findIndex(
        (session) => session.id === id
      );

      if (sessionIndex === -1) {
        throw new Error(`CleaningSession with ID ${id} not found`);
      }

      // Update the session with the new input
      const updatedSession = {
        ...cleaningSessions[sessionIndex],
        ...input, // Merge old data with new data
      };

      cleaningSessions[sessionIndex] = updatedSession;

      return updatedSession; // Return the updated session
    },
    // Mutation to Delete a Cleaning Session
    deleteCleaningSession: (_, { id }) => {
      const initialLength = cleaningSessions.length;

      // Find the index of the session to remove
      const index = cleaningSessions.findIndex((session) => session.id === id);

      if (index > -1) {
        cleaningSessions.splice(index, 1); // Remove 1 element at the found index
      }

      return cleaningSessions.length < initialLength; // Return true if deletion was successful
    },
  },
};

// Export the resolvers so they can be used in the Apollo Server
module.exports = resolvers;
