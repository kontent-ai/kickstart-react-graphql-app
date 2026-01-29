import { graphql } from "../graphql/gql.ts";

export const GetSolutionsQuery = graphql(`
  query GetSolutionsQuery {
    solution_All {
      items {
        ...Solution
      }
    }
  }
`);
