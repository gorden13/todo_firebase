import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDR_tQauppop_IMnHEQcfqXFt3wacu_xuc',
  authDomain: 'todos-cd400.firebaseapp.com',
  databaseURL: 'https://todos-cd400.firebaseio.com',
  projectId: 'todos-cd400',
  storageBucket: 'todos-cd400.appspot.com',
  messagingSenderId: '841981244827',
  appId: '1:841981244827:web:e7c3198699c458709f1d3e'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const fireDb = firebase.firestore()
export const db = firebase.database()
export default firebase
