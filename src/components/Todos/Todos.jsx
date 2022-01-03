import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { initTodos } from "../../redux/actions";
import "./todos.css";

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  get completedTodos() {
    return this.props.todos.filter((todo) => !todo.deleted && todo.completed);
  }

  get unCompletedTodos() {
    return this.props.todos.filter((todo) => !todo.deleted && !todo.completed);
  }

  render() {
    return (
      <div className="todos" id="todos">
        <TodoInput />
        <div className="todoitems" id="todoitems">
          {this.unCompletedTodos.map((todo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
          {this.completedTodos.map((todo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initTodos: (payload) => dispatch(initTodos(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
