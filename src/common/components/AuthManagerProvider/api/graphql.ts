import { DocumentNode, gql } from '@apollo/client';

export const GET_USER: DocumentNode = gql`
  query GetUser($userId: String) {
    getUser(userId: $userId) {
      id
      firstName
      lastName
      middleName
      fullName
      email
      roles
      photo
      privileges
      subscriptionPlan
    }
  }
`;
