import React from "react";
import TodoInput from "./TodoInput";
import axios from "../../config/axios";
import TodoItem from "./TodoItem";
import "./todos.css";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  async createTodo(params) {
    await axios.post("todos", params).then((response) => console.log(response));
  }

  async componentDidMount() {
    await this.getTodos();
    let newTodos = this.state.todos.map((todo) =>
      Object.assign({}, todo, { isEditing: false })
    );
    this.setState({ todos: newTodos });
    console.log(this.state.todos);
  }

  async getTodos() {
    await axios
      .get("/todos")
      .then((response) => this.setState({ todos: response.data.resources }))
      .catch((error) => {
        throw new Error(error);
      });
  }

  async update(id, params) {
    await axios
      .put(`todos/${id}`, params)
      .then((response) => {
        console.log(response.data.resource);
        let newTodos = this.state.todos.map((todo) => {
          params.isEditing = false;
          let newTodo = todo.id === id ? Object.assign({}, todo, params) : todo;
          return newTodo;
        });
        this.setState({ todos: newTodos });
      })
      .catch((error) => {
        console.log(console.log(error.response));
      });
  }

  changeEditingStatus(id, status) {
    let newTodos = this.state.todos.map((todo) => {
      todo.isEditing = todo.id === id ? status : false;
      return todo;
    });
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className="todos" id="todos">
        <TodoInput createTodo={this.createTodo} />
        <div className="todoitems" id="todoitems">
          {this.state.todos.map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                update={this.update.bind(this)}
                changeEditingStatus={(id, status) =>
                  this.changeEditingStatus(id, status)
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Todos;
