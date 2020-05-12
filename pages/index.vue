<template>
  <div class="todo-base">
    <todo-form />
    <div class="splitter" />
    <todo-list />
    <!-- <div v-if="processing" class="loading-modal">
      <loading />
    </div> -->
  </div>
</template>

<script>
import todoList from '@/components/modules/TodoList'
import todoForm from '@/components/modules/TodoForm'
// import loading from '@/components/elements/Loading'

export default {
  middleware: 'router-auth',
  components: {
    todoList,
    todoForm
    // loading
  },
  data: () => ({
    unfold: -1,
    items: []
  }),
  // computed: {
  //   processing () {
  //     return this.$store.state.auth.processing
  //   }
  // },
  methods: {
    toggleFold (i) {
      let unfoldIndex = -1
      if (i !== this.unfold) {
        unfoldIndex = i
      }
      this.unfold = unfoldIndex
    }
  }
}
</script>
