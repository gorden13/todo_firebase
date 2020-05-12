<template>
  <div class="todo-form">
    <input
      v-model="todoTitle"
      class="input"
      type="text"
      placeholder="Новый таск"
      autofocus
      @keyup="handleSubmit"
    >
    <button
      class="submit-btn"
      @click="handleSubmit"
    >
      <img src="~/assets/svg/plus.svg" alt="">
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/plugins/fireinit.js'

export default {
  data: () => ({
    todoTitle: '',
    itemsRef: null
  }),
  async mounted () {
    this.itemsRef = await db.ref('todos')
  },
  methods: {
    ...mapActions({
      createItem: 'todoStore/create'
    }),
    handleSubmit (e) {
      if (e.type === 'click' || e.keyCode === 13) {
        const titleText = this.todoTitle.trim()
        if (titleText.length > 0) {
          // this.createItem(titleText)
          this.itemsRef.push({
            title: titleText,
            done: false
          }).then(() => {
            this.todoTitle = ''
          })
        }
      }
    }
  }
}
</script>
