import { gql } from '../../../utils/apolloClient';

export const queryGetFeedPage = gql`
  query  {
    feeds(
      sort: ["createdAt:desc"]
      pagination: { limit: 5 }
    ) {
      data {
        id
        attributes {
          name
          color
          content
          imageLink
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
