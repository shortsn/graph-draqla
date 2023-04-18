import { gql } from "./deps.ts";

const File = `
  """
  Name of the File
  """
  name: String!
  """
  Extension
  """
  ext: String!
  "The size of the file, in bytes."
  size: Int!
`

const Text = `
  ${File}
  text: String
`

export const typeDefs = gql`
  directive @fump(filter: String) on FIELD_DEFINITION

  scalar JSON

  interface File { ${File} }

  interface HasText {
    """
    Text content
    """
    text: String
  }

  type unknown implements File { ${File} }

  "Plain Text"
  type txt implements File & HasText { ${Text} }

  "CSV Data"
  type csv implements File & HasText {
    ${Text}
    """
    Parsed Data Rows as JSON
    """
    rows(include: [String], exclude: [String]): JSON
  }

  type Query {
    files: [File]
    file(name: String!): File @fump
  }

`;
