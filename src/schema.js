const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar DateTime
  """
  Represents a host who owns or manages properties.
  """
  type Host {
    id: ID!
    name: String!
    properties: [Property!]!
  }
  """
  Represents a property that can be cleaned.
  """
  type Property {
    id: ID!
    name: String!
    address: String!
    host: Host!
  }
  """
  Represents a cleaner who performs cleaning sessions
  """
  type Cleaner {
    id: ID!
    name: String!
    # Add more fields such as email, phone number, etc.
    cleaningSessions: [CleaningSession!]!
  }
  """
  Represents a cleaning session performed on a specific property
  by a specific cleaner.
  """
  type CleaningSession {
    id: ID!
    property: Property!
    cleaner: Cleaner!
    tasks: [String!]!
    startTime: DateTime!
    endTime: DateTime!
    notes: String
  }
  """
  Input type for filtering cleaning sessions
  """
  input CleaningSessionFilter {
    propertyId: ID
    cleanerId: ID
    start: DateTime
    end: DateTime
  }
  """
  Input for logging a new cleaning session
  """
  input LogCleaningSessionInput {
    propertyId: ID!
    cleanerId: ID!
    tasks: [String!]!
    startTime: DateTime!
    endTime: DateTime!
    notes: String
  }
  """
  Input type for creating a new property
  """
  input CreatePropertyInput {
    hostId: ID!
    name: String!
    address: String!
  }
  """
  Input type for updating an existing property
  """
  input UpdatePropertyInput {
    id: ID!
    name: String
    address: String
  }
  """
  Input type for creating new host
  """
  input CreateHostInput {
    name: String!
  }
  """
  Input for creating a new cleaner
  """
  input CreateCleanerInput {
    name: String!
  }
  """
  Input for updating cleaner details
  """
  input UpdateCleanerInput {
    id: ID!
    name: String
  }

  type Query {
    """
    Fetches an array of cleaning sessions, optionally filtered by property, cleaner, or time range.
    """
    cleaningSessions(filter: CleaningSessionFilter): [CleaningSession!]!

    """
    Fetch all properties
    """
    properties: [Property!]!

    """
    Fetch a single property by its ID.
    """
    property(id: ID!): Property

    """
    Fetch a single host by its ID.
    """
    host(id: ID!): Host

    """
    Fetch all hosts
    """
    hosts: [Host!]!

    """
    Fetch a single cleaner by its ID.
    """
    cleaner(id: ID!): Cleaner

    """
    Fetch all cleaners
    """
    cleaners: [Cleaner!]!
  }

  type Mutation {
    """
    Logs a new cleaning session for a given property and cleaner.
    """
    logCleaningSession(input: LogCleaningSessionInput!): CleaningSession!

    """
    Creates a new property associated with a host
    """
    createProperty(input: CreatePropertyInput!): Property!

    """
    Updates a property (partial updates allowed)
    """
    updateProperty(input: UpdatePropertyInput!): Property!

    """
    Updates a cleaning session
    """
    updateCleaningSession(
      id: ID!
      input: LogCleaningSessionInput!
    ): CleaningSession!
    """
    Delete cleaning session
    """
    deleteCleaningSession(id: ID!): Boolean!

    """
    Creates a new host
    """
    createHost(input: CreateHostInput): Host!

    """
    Creates a new cleaner
    """
    createCleaner(input: CreateCleanerInput!): Cleaner!

    """
    Updates an existing cleaner(partial updates allowed).
    """
    updateCleaner(input: UpdateCleanerInput!): Cleaner!
  }
`;

module.exports = typeDefs;
