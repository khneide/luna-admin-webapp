/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrgs = /* GraphQL */ `
  query GetOrgs {
    getOrgs {
      orgId
      name
      dateOnboarded
      address
    }
  }
`;
export const getFacilitiesForOrg = /* GraphQL */ `
  query GetFacilitiesForOrg($orgId: ID!) {
    getFacilitiesForOrg(orgId: $orgId) {
      facilityId
      name
      dateOnboarded
      address
    }
  }
`;
export const getOrgUsersForFacility = /* GraphQL */ `
  query GetOrgUsersForFacility($facilityId: ID!) {
    getOrgUsersForFacility(facilityId: $facilityId) {
      pccId
      lunaId
      fullName
      email
      phone
      address
      dateOnboarded
      subscriptionStatus
    }
  }
`;
