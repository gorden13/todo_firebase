import { auth } from '~/plugins/fireinit.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(store.dispatch('auth/setUserAction', user))
      }
      return resolve()
      // store.commit('auth/setUser', user)
      // resolve()
    })
  })
}

// const checkUserStatus = ({ store }) => new Promise((resolve, reject) => {
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       const {
//         uid,
//         email,
//         displayName,
//         emailVerified,
//         refreshToken
//       } = user
//       store.commit('auth/setUser', {
//         uid,
//         email,
//         displayName,
//         emailVerified,
//         refreshToken
//       })
//     }
//     resolve(user)
//   }, err => reject(err))
// })

// export default checkUserStatus
