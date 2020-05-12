<template>
  <div class="todo-base">
    <todo-form />
    <div class="splitter" />
    <todo-list />
    <!-- <div v-for="item in items" :key="item.id">
      {{ item.title }}
    </div> -->
    <div v-if="processing" class="loading-modal">
      <loading />
    </div>
  </div>
</template>

<script>
import todoList from '@/components/modules/TodoList'
import todoForm from '@/components/modules/TodoForm'
import loading from '@/components/elements/Loading'
// import { db } from '@/plugins/fireinit.js'

export default {
  // middleware: 'router-auth',
  components: {
    todoList,
    todoForm,
    loading
  },
  // asyncData ({ store }) {
  //   return {
  //     itemsRef: db.ref('todos')
  //   }
  // },
  data: () => ({
    unfold: -1,
    items: []
  }),
  computed: {
    processing () {
      return this.$store.state.auth.processing
    }
  },
  // created () {
  //   const vm = this
  //   vm.itemsRef.on('value', function (snapshot) {
  //     vm.items = snapshot.val()
  //   })
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
