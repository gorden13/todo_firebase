<template>
  <div>
    <form>
      <div class="field">
        <h1 class="title is-4">
          Авторизация Todos
        </h1>
      </div>
      <div class="field">
        <div class="control">
          <button class="button" @click="googleSignUp">
            <img alt="Google Logo" src="~/assets/images/google-logo.png">
          </button>
        </div>
        <p class="help">
          Войти с помощью учётной записи Google
        </p>
      </div>
    </form>
    <div v-if="processing" class="loading-modal">
      <loading />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { auth, GoogleProvider } from '@/plugins/fireinit'
export default {
  middleware: 'quest',
  data: () => ({
    error: ''
  }),
  computed: {
    processing () {
      return this.$store.state.auth.processing
    }
  },
  methods: {
    ...mapActions({
      signInWithGoogle: 'auth/signInWithGoogle'
    }),
    googleSignUp () {
      this.signInWithGoogle().then(() => {
        // setTimeout(() => {
        // this.$toast.show('Авторизация')
        // location.reload()
        // setTimeout(() => {
        this.$router.push('/')
        // }, 2000)
        // }, 300)
      }).catch((e) => {
        this.$toast.error(e)
      })
      // auth.signInWithRedirect(GoogleProvider).then((result) => {
      //   this.$router.replace('/')
      // }).catch((err) => {
      //   this.$toast.error(err.message)
      // })
    }
  }
}
</script>
