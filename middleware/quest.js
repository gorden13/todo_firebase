export default function ({ store, redirect, route }) {
  if (store.state.auth.user) {
    return redirect('/')
  }
}
