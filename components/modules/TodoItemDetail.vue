<template>
  <div class="detail">
    <div class="detail__info">
      <p>
        Заголовок: {{ editting ? '' : title }}
      </p>
      <input
        v-if="editting"
        v-model="editTitle"
        class="text input"
        type="text"
      >
    </div>
    <p class="text">
      Статус: {{ status }}
    </p>
    <div class="detail__action-buttons">
      <div
        v-if="!editting"
        class="icon-btn"
        @click.stop="handleStartEdit"
      >
        <img src="~/assets/svg/edit.svg" alt="">
      </div>
      <div
        v-if="!editting"
        class="icon-btn"
        @click.stop="$emit('remove')"
      >
        <img src="~/assets/svg/delete.svg" alt="">
      </div>
      <button
        v-if="editting"
        class="button is-dark"
        @click.stop="handleSubmitEdit"
      >
        ок
      </button>
      <button
        v-if="editting"
        class="button is-dark"
        @click.stop="handleCancelEdit"
      >
        отменить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Название'
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editting: false,
      editTitle: '',
      editDue: null
    }
  },
  computed: {
    status () {
      return this.done ? 'завершено' : 'в работе'
    }
  },
  watch: {
    fold (val) {
      if (this.fold) {
        this.handleCancelEdit()
      }
    }
  },
  methods: {
    handleStartEdit () {
      this.editTitle = this.title
      this.editting = true
    },
    handleSubmitEdit () {
      const titleText = this.editTitle.trim()
      if (titleText.length < 1) {
        return
      }
      this.$emit('edit', {
        title: titleText
      })
      this.editting = false
    },
    handleCancelEdit () {
      this.editTitle = ''
      this.editting = false
    }
  }
}
</script>
