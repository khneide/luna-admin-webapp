const awsmobile = {
  aws_project_region: process.env.REACT_APP_STAGE,
  aws_cognito_region: process.env.REACT_APP_STAGE,
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  oauth: {
    redirectSignIn: process.env.REACT_APP_APP_DOMAIN,
    redirectSignOut: process.env.REACT_APP_APP_DOMAIN,
    domain: process.env.REACT_APP_USER_POOL_DOMAIN,
    responseType: "code"
  }
}

export default awsmobile;