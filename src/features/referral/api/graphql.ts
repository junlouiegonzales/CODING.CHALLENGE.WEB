import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_ALL_REFERRALS: DocumentNode = gql`
  query GetAllReferrals {
    getAllReferrals {
      id
      givenName
      surname
      phone
      email
      homeNameNumber
      street
      suburb
      state
      postcode
      country
    }
  }
`;

export const CREATE_REFERRAL: DocumentNode = gql`
  mutation CreateReferral(
    $givenName: String!
    $surname: String!
    $phone: String!
    $email: String!
    $homeNameNumber: String!
    $street: String!
    $suburb: String!
    $state: String!
    $postcode: String!
    $country: String!
  ) {
    createReferral(
      givenName: $givenName
      surname: $surname
      phone: $phone
      email: $email
      homeNameNumber: $homeNameNumber
      street: $street
      suburb: $suburb
      state: $state
      postcode: $postcode
      country: $country
    ) {
      response
    }
  }
`;

export const UPDATE_REFERRAL: DocumentNode = gql`
  mutation UpdateReferral(
    $referralId: String!
    $givenName: String!
    $surname: String!
    $phone: String!
    $email: String!
    $homeNameNumber: String!
    $street: String!
    $suburb: String!
    $state: String!
    $postcode: String!
    $country: String!
  ) {
    updateReferral(
      referralId: $referralId
      givenName: $givenName
      surname: $surname
      phone: $phone
      email: $email
      homeNameNumber: $homeNameNumber
      street: $street
      suburb: $suburb
      state: $state
      postcode: $postcode
      country: $country
    ) {
      response
    }
  }
`;

export const REMOVE_REFERRAL: DocumentNode = gql`
  mutation RemoveReferral($referralId: String!) {
    removeReferral(referralId: $referralId) {
      response
    }
  }
`;
