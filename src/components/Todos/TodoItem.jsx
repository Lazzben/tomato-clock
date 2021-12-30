import React from "react";
import { Checkbox } from "antd";
import { EnterOutlined, DeleteFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { updateTodo, editTodo } from "../../redux/actions";
import axios from "../../config/axios";
import "./todoitem.css";
import classNames from "classnames";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingText: this.props.description,
    };
  }

  // 发送 todo 更新请求
  async updateTodo(params) {
    await axios
      .put(`todos/${this.props.id}`, params)
      .then((response) =>
        this.props.updateTodo({ ...response.data.resource, isEditing: false })
      )
      .catch((error) => console.log(console.log(error.response)));
  }

  onKeyUp(e) {
    if (e.keyCode === 13 && this.state.editingText !== "") {
      this.updateTodo({ description: this.state.editingText });
    }
  }

  render() {
    const { completed, isEditing, id, description } = this.props;
    const { editingText } = this.state;
    const Editing = (
      <div className="editing">
        <input
          value={editingText}
          onChange={(e) => this.setState({ editingText: e.target.value })}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
        <div className="iconWrapper">
          <EnterOutlined
            className="icon"
            onClick={() => this.updateTodo({ description: editingText })}
          />
          <DeleteFilled
            className="icon"
            onClick={() => this.updateTodo({ deleted: true })}
          />
        </div>
      </div>
    );
    const Text = (
      <span className="text" onDoubleClick={() => this.props.editTodo(id)}>
        {description}
      </span>
    );
    const todoItemClass = classNames({
      todoitem: true,
      editing: isEditing,
      completed: completed,
    });
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

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTodo: (payload) => dispatch(updateTodo(payload)),
    editTodo: (payload) => dispatch(editTodo(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
