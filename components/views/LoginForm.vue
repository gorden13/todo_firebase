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
        this.$router.push('/')
      }).catch((e) => {
        this.$toast.error(e)
      })
    }
  }
}
</script>
