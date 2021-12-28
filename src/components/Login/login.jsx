import React from "react";
import { Button, Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import axios from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      account: "",
      password: "",
    };
  }

  onChangeAccount(e) {
    this.setState({
      account: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async login() {
    const { account, password } = this.state;
    await axios
      .post("sign_in/user", {
        account,
        password,
      })
      .then((response) => {
        console.log(response);
        this.props.navigation("/index");
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  render() {
    const { account, password } = this.state;
    return (
      <div className="login_signup" id="login">
        <h1>登陆</h1>
        <Input
          placeholder="input username"
          prefix={<UserOutlined />}
          value={account}
          onChange={this.onChangeAccount.bind(this)}
        />
        <Input.Password
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          value={password}
          onChange={this.onChangePassword.bind(this)}
        />
        <Button type="primary" block onClick={this.login.bind(this)}>
          登陆
        </Button>

        <p>
          如果没有账号，请<Link to="/signup"> 注册</Link>
        </p>
      </div>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  return <Login navigation={navigation} />;
}
