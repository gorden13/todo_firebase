import Vue from 'vue'
import { fireDb } from '~/plugins/fireinit'
const collectionName = 'todos'
export const state = () => ({
  todos: []
})

export const mutations = {
  add (state, { id, title }) {
    state.todos.unshift({
      id,
      title,
      done: false
    })
  },
  setTodos (state, list) {
    state.todos = list
  },
  updateIsChangeNote (state, value) {
    state.isNoteChange = value
  },
  edit (state, { todo, title, due }) {
    todo.title = title
    todo.due = due
  },
  remove (state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  toggle (state, { todo }) {
    todo.done = !todo.done
  },
  updateTodo (state, { noteId, taskIndex }) {
    state.notes.forEach((item, index) => {
      if (item.id === noteId) {
        Vue.set(state.notes, index, state.note)
      }
    })
  },
  removeTodo (state, taskId) {
    state.note.tasks.splice(taskId, 1)
    this.dispatch('notes/update', state.note)
  }
}

export const actions = {
  async fetchAllTodos ({ dispatch, commit }) {
    const collectionRef = fireDb.collection('todos')
    try {
      const todos = []
      const snapshots = await collectionRef.get()
      snapshots.forEach((doc) => {
        const docData = doc.data()
        todos.push({
          ...docData,
          id: doc.id
        })
      })
      commit('setTodos', todos)
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async create ({ commit }, title) {
    try {
      const addRef = await fireDb.collection(collectionName).add({
        title,
        done: false
      })
      commit('add', {
        id: addRef.id,
        title
      })
      this.$toast.show('Новый таск был успешно создан')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async toggle ({ commit }, { todo }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).set({
        done: !todo.done
      }, { merge: true })
      commit('toggle', { todo })
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async edit ({ commit }, { todo, title }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).set({
        title
      }, { merge: true })
      commit('edit', { todo, title })
      this.$toast.show('Таск был успешно обновлён')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async remove ({ commit }, { todo }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).delete()
      commit('remove', { todo })
      this.$toast.show('Таск был успешно удалён')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  updateNoteTitle ({ commit }, title) {
    commit('setNoteTitle', title)
  },
  emptyState ({ commit }, note) {
    commit('emptyState', note)
  },
  updateNote ({ commit }) {
    commit('setNote')
  },
  updateIsChangeNote ({ commit }, value) {
    commit('updateIsChangeNote', value)
  },
  updateIsEditNote ({ commit }, value) {
    commit('updateIsEditNote', value)
  },
  checkTask ({ commit }, { noteId, taskIndex }) {
    commit('checkTask', { noteId, taskIndex })
  },
  createTask ({ commit }, newTask) {
    commit('createTask', newTask)
  },
  removeTask ({ commit }, taskId) {
    commit('removeTask', taskId)
  },
  updateTaskTitle ({ commit }, { title, taskIndex }) {
    commit('updateTaskTitle', { title, taskIndex })
  },
  updateVisibleEditableButtons ({ commit }, value) {
    commit('updateVisibleEditableButtons', value)
  },
  updateTaskEditIndex ({ commit }, index) {
    commit('updateTaskEditIndex', index)
  }
}

export const getters = {
  getTodos: s => s.todos,
  isNoteChange: s => s.isNoteChange,
  isTaskChange: s => s.isTaskChange,
  isNoteEdit: s => s.isNoteEdit,
  taskEditIsOn: s => s.taskEditIndex !== -1,
  getTaskListByNoteId: s => (noteId) => {
    const note = s.notes.find(item => item.id === noteId)
    if (note) {
      return note.tasks || []
    }
    return []
  },
  editModeIsOn: (s) => {
    // если редатируем таск или название заметки
    return s.taskEditIndex !== -1 || s.isNoteEdit
  }
}
