
import { auth, GoogleProvider } from '~/plugins/fireinit'

export const state = () => ({
  user: '',
  processing: false
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setProcessing (state, status) {
    state.processing = status
  }
}

export const actions = {
  autoSignIn ({ commit }, payload) {
    commit('setUser', payload)
  },

  signInWithGoogle ({ commit }) {
    // commit('setProcessing', true)

    // auth.signInWithRedirect(GoogleProvider).then((res) => {
    //   console.log(rs);
    // }).catch()

    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      // commit('setProcessing', false)
      // setTimeout(() => {
      resolve()
    })
  },

  setUserAction ({ commit }, payload) {
    commit('setUser', payload)
  },

  signOut ({ commit }) {
    // commit('setProcessing', true)
    auth.signOut().then(() => {
      // commit('setProcessing', false)
      commit('setUser', '')
    }).catch(err => (err))
  }
}

export const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  }
}
