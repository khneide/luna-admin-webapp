export const getFacilityListPath = (orgId: string) => {
  return `/org/${encodeURIComponent(orgId)}/facilities`
}

export const getFacilityAddPath = (orgId: string) => {
  return `/org/${encodeURIComponent(orgId)}/facility/add`;
}

export const getFacilityEditPath = (orgId: string, facilityId: string) => {
  return `/org/${encodeURIComponent(orgId)}/facility/${encodeURIComponent(facilityId)}/edit`;
}


export const getOrgEditPath = (orgId: string) => {
  return `/org/${encodeURIComponent(orgId)}/edit`;
}

export const getUserlistPath = (orgId: string, facilityId: string) => {
  return `/org/${encodeURIComponent(orgId)}/facility/${encodeURIComponent(facilityId)}/users`
}

export const getUserEditPath = (orgId: string, facilityId: string) => {
  return `/org/${encodeURIComponent(orgId)}/facility/${encodeURIComponent(facilityId)}/user/edit`
}

export const PATHS = {
  ORG_LIST: '/',
  FACILITY_LIST: '/org/:orgId/facilities',
  USERS_LIST: '/org/:orgId/facility/:facilityId/users',
  ADD_ORG: '/org/add',
  EDIT_ORG: '/org/:orgId/edit',
  ADD_FACILITY: '/org/:orgId/facility/add',
  EDIT_FACILITY: '/org/:orgId/facility/:facilityId/edit',
  EDIT_USER: '/org/:orgId/facility/:facilityId/user/edit'
}

export const SUBSCRIPTION_TYPES = {
  TRIAL30: 'trial_30',
  FREE: 'free',
  ACTIVE: 'active'
}