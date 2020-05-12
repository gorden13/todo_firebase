<template>
  <div class="layout">
    <section class="section">
      <div class="container">
        <h1 v-if="error.statusCode === 404">
          Страница не найдена
        </h1>
        <h1 v-else>
          Произошла ошибка
        </h1>
        <p v-if="error.statusCode !== 404 && error.message">
          {{ error.message }}
        </p>
        <nuxt-link to="/">
          Главная страница
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
