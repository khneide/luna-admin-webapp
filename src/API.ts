/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddOrgInput = {
  orgId: string,
  name: string,
  address?: string | null,
  dateOnboarded: number,
};

export type AddFacilityInput = {
  facilityId: string,
  name: string,
  dateOnboarded: number,
  address?: string | null,
  orgId: string,
};

export type UpdateUserInput = {
  pccId: string,
  lunaId: string,
  facilityId: string,
  fullName: string,
  email: string,
  subscriptionStatus: string,
  phone?: string | null,
  address?: string | null,
};

export type Org = {
  __typename: "Org",
  orgId: string,
  name: string,
  dateOnboarded: number,
  address?: string | null,
};

export type Facility = {
  __typename: "Facility",
  facilityId: string,
  name: string,
  dateOnboarded: number,
  address?: string | null,
};

export type OrgUser = {
  __typename: "OrgUser",
  pccId: string,
  lunaId: string,
  fullName: string,
  email: string,
  phone?: string | null,
  address?: string | null,
  dateOnboarded: number,
  subscriptionStatus: string,
};

export type AddOrgMutationVariables = {
  input?: AddOrgInput | null,
};

export type AddOrgMutation = {
  addOrg?: string | null,
};

export type AddFacilityMutationVariables = {
  input?: AddFacilityInput | null,
};

export type AddFacilityMutation = {
  addFacility?: string | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput | null,
};

export type UpdateUserMutation = {
  updateUser?: string | null,
};

export type GetOrgsQuery = {
  getOrgs?:  Array< {
    __typename: "Org",
    orgId: string,
    name: string,
    dateOnboarded: number,
    address?: string | null,
  } | null > | null,
};

export type GetFacilitiesForOrgQueryVariables = {
  orgId: string,
};

export type GetFacilitiesForOrgQuery = {
  getFacilitiesForOrg?:  Array< {
    __typename: "Facility",
    facilityId: string,
    name: string,
    dateOnboarded: number,
    address?: string | null,
  } | null > | null,
};

export type GetOrgUsersForFacilityQueryVariables = {
  facilityId: string,
};

export type GetOrgUsersForFacilityQuery = {
  getOrgUsersForFacility?:  Array< {
    __typename: "OrgUser",
    pccId: string,
    lunaId: string,
    fullName: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    dateOnboarded: number,
    subscriptionStatus: string,
  } | null > | null,
};
