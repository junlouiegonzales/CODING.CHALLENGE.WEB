import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_ALL_USERS: DocumentNode = gql`
  query GetAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      contactNumber
    }
  }
`;

export const CREATE_USER: DocumentNode = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $contactNumber: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      contactNumber: $contactNumber
    ) {
      response
    }
  }
`;

export const REMOVE_USER: DocumentNode = gql`
  mutation RemoveUser($userId: String!) {
    removeUser(userId: $userId) {
      response
    }
  }
`;
