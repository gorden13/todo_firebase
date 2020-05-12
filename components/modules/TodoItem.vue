<template>
  <div class="todo-item">
    <div class="todo-item__title" @click="toggleFold">
      <div
        class="todo-item-checkbox"
        :class="[done? 'checked' : '']"
        @click.stop="toggle"
      />
      <h1
        class="title is-4"
        :class="[done? 'deleted' : '']"
      >
        {{ title }}
      </h1>
    </div>
    <div
      class=""
      :class="['unfold']"
    >
      <todoitem-detail
        :title="title"
        :done="done"
        @remove="$emit('remove')"
        @edit="(e) => $emit('edit', e)"
      />
    </div>
  </div>
</template>

<script>
import TodoitemDetail from '@/components/modules/TodoItemDetail'
export default {
  components: {
    TodoitemDetail
  },
  props: {
    title: {
      type: String,
      default: 'Имя таска'
    },
    done: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: 'Описание'
    }
  },
  computed: {
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    },
    toggleFold () {
      this.$emit('toggle-fold')
    }
  }
}
</script>
