import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import Todos from "../Todos/Todos";
import "./index.css";
import { initTodos } from "../../redux/actions";
import { connect } from "react-redux";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  logout() {
    localStorage.setItem("x-token", "");
    this.props.navigation("/login");
  }

  async getCurrentAccount() {
    await axios
      .get("/me")
      .then((response) => {
        this.setState({
          account: response.data.account,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.navigation("/login");
        }
        throw new Error(console.error());
      });
  }

  async getTodos() {
    await axios
      .get("/todos")
      .then((response) => this.props.initTodos(response.data.resources))
      .catch((error) => {
        throw new Error(error);
      });
  }

  componentDidMount() {
    this.getCurrentAccount();
    this.getTodos();
  }

  menu() {
    return (
      <Menu key={11}>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">
            个人设置
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.logout.bind(this)}
          >
            注销
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className="index" id="index">
        <header>
          <div>LOGO</div>
          <Dropdown overlay={this.menu()}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {this.state.account} <DownOutlined />
            </a>
          </Dropdown>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    );
  }
}

function IndexWrapper(props) {
  const navigation = useNavigate();
  return <Index navigation={navigation} {...props} />;
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initTodos: (payload) => dispatch(initTodos(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexWrapper);
