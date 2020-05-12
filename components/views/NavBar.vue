<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link
          class="navbar-item"
          active-class="active"
          exact
          to="/"
        >
          Todo лист
        </nuxt-link>
        <nuxt-link
          class="navbar-item"
          active-class="active"
          exact
          to="/login"
          @click.native="signOut"
        >
          Выйти
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
      location.reload()
    }
  }
}
</script>
