import React from "react";
import { Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
    };
  }

  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  createTodo() {
    if (this.state.desc === "") return;
    this.props.createTodo({ description: this.state.desc });
    this.setState({ desc: "" });
  }

  onkeyEnter(e) {
    if (e.keyCode === 13) {
      this.createTodo();
    }
  }

  render() {
    return (
      <div className="todoinput" id="input">
        <Input
          placeholder="添加新任务"
          suffix={
            this.state.desc === "" ? (
              <span />
            ) : (
              <EnterOutlined onClick={this.createTodo.bind(this)} />
            )
          }
          onChange={this.onChangeDesc.bind(this)}
          onKeyUp={this.onkeyEnter.bind(this)}
        />
      </div>
    );
  }
}

export default TodoInput;
