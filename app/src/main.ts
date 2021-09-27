import { router } from '@/router'
import { userStore, userStoreKey } from '@/stores/user'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Amplify from 'aws-amplify'

const defaultRegion = 'eu-west-1'

Amplify.configure({
  aws_project_region: process.env.VUE_APP_PROJECT_REGION || defaultRegion,
  oauth: {},

  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',

  API: {
    region: process.env.VUE_APP_APPSYNC_REGION || defaultRegion,
    graphql_endpoint: process.env.VUE_APP_APPSYNC_GRAPHQL_ENDPOINT,
  },

  Auth: {
    mandatorySignIn: true,

    // Amazon Cognito Region
    region: process.env.VUE_APP_COGNITO_REGION || defaultRegion,

    // Amazon Cognito User Pool ID
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,

    // Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
})

const app = createApp(App)

app.component('fa', FontAwesomeIcon)

app.use(userStore, userStoreKey)
app.use(router)

app.mount('#app')
