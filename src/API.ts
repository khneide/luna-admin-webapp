/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Name = {
  __typename: "Name",
  pk: string,
  sk: string,
  name: string,
};

export type GetNameByIdQueryVariables = {
  pk: string,
  sk: string,
};

export type GetNameByIdQuery = {
  getNameById?:  {
    __typename: "Name",
    pk: string,
    sk: string,
    name: string,
  } | null,
};
