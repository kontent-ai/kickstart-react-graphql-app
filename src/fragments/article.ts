import { graphql } from "../graphql/gql.ts";

export const Article = graphql(`
  fragment Article on Article {
    __typename
    _system_ {
      id
      codename
    }
    title
    introduction
    bodyCopy {
      html
    }
    publishDate_with_timezone {
      display_timezone
      value
    }
    image {
      items {
      ...Asset
      }
    }
  }
`);
