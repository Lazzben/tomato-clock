import React from "react";
import { Checkbox } from "antd";
import { EnterOutlined, DeleteFilled } from "@ant-design/icons";
import "./todoitem.css";
import classNames from "classnames";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingText: this.props.description,
    };
  }

  updateTodo(params) {
    this.props.update(this.props.id, params);
  }

  onEditTextChange(e) {
    this.setState({
      editingText: e.target.value,
    });
  }

  editTodo() {
    this.props.changeEditingStatus(this.props.id, true);
  }

  onKeyUp(e) {
    if (e.keyCode === 13 && this.state.editingText !== "") {
      this.updateTodo({ description: this.state.editingText });
    }
  }

  render() {
    const { completed, isEditing } = this.props;
    const { editingText } = this.state;
    const Editing = (
      <div className="editing">
        <input
          value={editingText}
          onChange={(e) => this.onEditTextChange(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
        <div className="iconWrapper">
          <EnterOutlined className="icon"
            onClick={() => this.updateTodo({ description: editingText })}
          />
          <DeleteFilled className="icon" onClick={() => this.updateTodo({ deleted: true })}/>
        </div>
      </div>
    );
    const Text = (
      <span className="text" onDoubleClick={() => this.editTodo()}>
        {this.props.description}
      </span>
    );
    const todoItemClass = classNames({
        todoitem: true,
        editing: isEditing,
        completed: completed
    })
    return (
      <div className={todoItemClass} id="todoitem">
        <Checkbox
          checked={completed}
          onChange={() => this.updateTodo({ completed: !completed })}
        />
        {isEditing ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;
