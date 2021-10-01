import { router } from '@/router'
import { userStore, userStoreKey } from '@/stores/user'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Amplify from 'aws-amplify'

const defaultRegion = 'eu-west-1'

const env = import.meta.env

Amplify.configure({
  aws_project_region: defaultRegion, // (required) - Region where Amazon Cognito project was created
  aws_appsync_graphqlEndpoint: env.VITE_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_region: defaultRegion, // (required) - Region where Amazon Cognito project was created
  aws_cognito_region: defaultRegion, // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id:  env.VITE_COGNITO_USER_POOL_ID, // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID, // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_cognito_identity_pool_id: '', // (optional) - Amazon Cognito Identity Pool ID
})

const app = createApp(App)

app.use(userStore, userStoreKey)
app.use(router)

app.mount('#app')
