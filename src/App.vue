<template>
  <section class="todoapp">
    <Header @add-todo="addTodo" />
    <Main :todos="todos" :filtered-todos="filteredTodos" :edited-todo="editedTodo"
          :remaining="remaining"
          @edit-todo="editTodo" @remove-todo="removeTodo" @done-edit="doneEdit"/>
    <Footer :todos="todos" :visibility="visibility" :remaining="remaining"
          @remove-completed="removeCompleted"/>
  </section>
</template>

<script>
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Main,
    Header
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.onHashChange);
  },
  data() {
    return {
      todos: [],
      id: 0,
      editedTodo: null,
      visibility: 'all',
    }
  },
  computed: {
    filteredTodos() {
      return this.filters(this.visibility);
    },
    remaining: function () {
      return this.filters('active').length;
    }
  },
  methods: {
    addTodo(todo) {
      var value = todo && todo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: this.id++,
        title: value,
        completed: false
      })
    },
    editTodo(todo) {
      this.editedTodo = todo;
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if(!todo.title) {
        this.removeTodo(todo);
      }
    },
    cancelEdit() {
      this.editedTodo = null;
    },
    filters(visibility) {
      if(visibility == "all") {
        return this.todos;
      }
      else if(visibility == "active") {
        return this.todos.filter(todo => !todo.completed);
      }
      else if(visibility == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
    },
    removeCompleted() {
      this.todos = this.filters("active");
    },
    onHashChange () {
      var visibility = window.location.hash.replace(/#\/?/, '')
      console.log(visibility);
      if (this.filters(visibility)) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>
