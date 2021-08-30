import { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { Auth } from 'aws-amplify'

export interface User {
  getUsername(): string
  attributes: Record<string, any>
}

export interface UserState {
  authorized: boolean
  user: User | null
  groups: string[]
  loginError: string
}

export const userStoreKey: InjectionKey<Store<UserState>> = Symbol()

export const userStore = createStore<UserState>({
  state: {
    authorized: false,
    user: null,
    groups: [],
    loginError: '',
  },
  mutations: {
    user(state, user) {
      state.authorized = !!user && user.attributes
      state.user = user
    },
    groups(state, groups) {
      state.groups = groups
    },
  },
  actions: {
    async fetchUser({ commit, dispatch }) {
      try {
        const user = await Auth.currentAuthenticatedUser()

        const expires =
          user.getSignInUserSession().getIdToken().payload.exp -
          Math.floor(new Date().getTime() / 1000)

        console.log(`Token expires in ${expires} seconds`)

        setTimeout(async () => {
          console.log('Renewing token')
          await dispatch('fetchUser')
        }, expires * 1000)

        commit('user', user)
        commit(
          'groups',
          user.getSignInUserSession().getIdToken().payload['cognito:groups'] ??
            []
        )
      } catch (e) {
        if (e) {
          console.error(e)
        }
        commit('user', null)
        commit('groups', [])
      }
    },
    async authState({ commit, dispatch }, state) {
      if (state === 'signedIn') {
        await dispatch('fetchUser')
      } else {
        commit('user', null)
        commit('groups', [])
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    groups(state) {
      return state.groups
    },
  },
})

export function useUserStore() {
  return useStore(userStoreKey)
}
