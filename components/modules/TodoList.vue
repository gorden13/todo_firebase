<template>
  <div class="todo-list">
    <template v-if="todos">
      <todo-item
        v-for="(todo, key) of todos"
        :key="key"
        :title="todo.title"
        :done="todo.done"
        :fold="key !== unfold"
        @toggle="toggleItem(key, todo)"
        @toggle-fold="toggleFold(key)"
        @remove="removeItem(key)"
        @edit="e => editItem(key, e, todo)"
      />
    </template>
    <p v-else>
      Пока нет записей, создайте первую!
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import todoItem from '@/components/modules/TodoItem'
import { db } from '@/plugins/fireinit.js'

export default {
  components: {
    todoItem
  },
  data: () => ({
    unfold: -1,
    todos: [],
    itemsRef: null
  }),
  computed: {
    ...mapGetters({
      // todos: 'todoStore/getTodos'
    })
  },
  async mounted () {
    const vm = this
    this.itemsRef = await db.ref('todos')
    vm.itemsRef.on('value', function (snapshot) {
      vm.todos = snapshot.val()
    })
  },
  methods: {
    ...mapActions({
      fetchAll: 'todoStore/fetchAllTodos',
      remove: 'todoStore/remove',
      edit: 'todoStore/edit',
      toggle: 'todoStore/toggle'
    }),
    toggleFold (i) {
      let unfoldIndex = -1
      if (i !== this.unfold) {
        unfoldIndex = i
      }
      this.unfold = unfoldIndex
    },
    removeItem (key) {
      // this.remove({ todo })
      this.itemsRef.child(key).remove()
      this.unfold = -1
    },
    toggleItem (key, todo) {
      // this.toggle(todo)
      const newTodo = { ...todo }
      newTodo.done = !todo.done
      this.updateDb(key, newTodo)
    },
    editItem (key, e, todo) {
      // this.edit({
      //   todo,
      //   ...e
      // })
      const newTodo = { ...todo }
      newTodo.title = e.title
      this.updateDb(key, newTodo)
      this.unfold = -1
    },
    updateDb (key, updatedItem) {
      const updates = {}
      updates['todos/' + key] = updatedItem
      db.ref().update(updates)
    }
  }
}
</script>
