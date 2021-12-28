import React from "react";
import { Button } from "antd";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account : ""
    }
  }

  logout() {
    localStorage.setItem('x-token', '');
    this.props.navigation('/login')
  }

  async getCurrentAccount() {
    await axios
      .get("/me")
      .then((response) => {
        console.log(response.data);
        this.setState({
          account: response.data.account
        })
      })
      .catch((error) => {
        console.log(error.response);
        if(error.response.status == 401) {
          this.props.navigation('/login')
        }
        throw new Error(console.error());
      });
  }

  componentDidMount(){
    this.getCurrentAccount();
  }

  render() {
    return (
      <div>
        <div>welcome {this.state.account}</div>
        <Button onClick={this.logout.bind(this)}>logout</Button>
      </div>
    );
  }
}

export default function(){
  const navigation = useNavigate();
  return <Index navigation={navigation}/>
};
