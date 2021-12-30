import React from "react";
import { Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { connect } from "react-redux";
import { addTodo } from "../../redux/actions";

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
    };
  }

  async createTodo() {
    if (this.state.desc === "") return;
    await axios
      .post("todos", { description: this.state.desc })
      .then((response) => {
        this.props.addTodo(response.data.resource);
        this.setState({ desc: "" });
      });
  }

  onkeyEnter(e) {
    if (e.keyCode === 13) {
      this.createTodo();
    }
  }

  render() {
    const { desc } = this.state;
    return (
      <div className="todoinput" id="input">
        <Input
          placeholder="添加新任务"
          value={desc}
          suffix={
            desc === "" ? (
              <span />
            ) : (
              <EnterOutlined onClick={this.createTodo.bind(this)} />
            )
          }
          onChange={(e) => this.setState({ desc: e.target.value })}
          onKeyUp={this.onkeyEnter.bind(this)}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (payload) => dispatch(addTodo(payload)),
  };
}

export default connect(undefined, mapDispatchToProps)(TodoInput);
