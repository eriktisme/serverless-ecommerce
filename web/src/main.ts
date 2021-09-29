import { router } from '@/router'
import { userStore, userStoreKey } from '@/stores/user'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Amplify from 'aws-amplify'

const defaultRegion = 'eu-west-1'

const env = import.meta.env

Amplify.configure({
  aws_project_region: env.VITE_PROJECT_REGION || defaultRegion,
  oauth: {},

  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',

  API: {
    region: env.VITE_APPSYNC_REGION || defaultRegion,
    graphql_endpoint: env.VITE_APPSYNC_GRAPHQL_ENDPOINT,
  },

  Auth: {
    // Amazon Cognito Region
    region: env.VITE_COGNITO_REGION || defaultRegion,

    // Amazon Cognito User Pool ID
    userPoolId: env.VITE_COGNITO_USER_POOL_ID,

    // Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
})

const app = createApp(App)

app.use(userStore, userStoreKey)
app.use(router)

app.mount('#app')
