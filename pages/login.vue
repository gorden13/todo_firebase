<template>
  <login-form />
</template>

<script>
import LoginForm from '@/components/views/LoginForm'

export default {
  layout: 'auth-layout',
  middleware: 'quest',
  components: {
    LoginForm
  }
}
</script>
