import { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { Auth } from 'aws-amplify'

export interface SidebarState {
  open: boolean
}

export const sidebarStoreKey: InjectionKey<Store<SidebarState>> = Symbol()

export const sidebarStore = createStore<SidebarState>({
  state: {
    open: true,
  },
  mutations: {
    toggle(state, open) {
      state.open = open
    },
  },
  getters: {
    isOpen(state) {
      return state.open
    },
  },
})

export function useSidebarStore() {
  return useStore(sidebarStoreKey)
}
