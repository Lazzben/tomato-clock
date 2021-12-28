import React from "react";
import axios from "../../config/axios";
import { Button, Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../Login/login.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      account: "",
      password: "",
      passwordConfirmation: "",
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

  onChangePasswordConfirmation(e) {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  }

  async signUp() {
    console.log(this.state);
    const { account, password, passwordConfirmation } = this.state;
    await axios
      .post("sign_up/user", {
        account,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        console.log(response);
        this.props.navigation("/index");
      })
      .catch(function (error) {
        throw new Error(error);
      });
  }

  render() {
    const { account, password, passwordConfirmation } = this.state;
    return (
      <div className="login_signup" id="signup">
        <h1>注册</h1>
        <Input
          placeholder="input username"
          prefix={<UserOutlined />}
          value={account}
          onChange={this.onChangeAccount.bind(this)}
        />
        <Input.Password
          placeholder="input password"
          value={password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={this.onChangePassword.bind(this)}
        />
        <Input.Password
          placeholder="comfirm password"
          value={passwordConfirmation}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={this.onChangePasswordConfirmation.bind(this)}
        />
        <Button type="primary" block onClick={this.signUp.bind(this)}>
          注册
        </Button>

        <p>
          如果已有账号，请<Link to="/login"> 登陆</Link>
        </p>
      </div>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();
  return <SignUp navigation={navigation} />;
}
