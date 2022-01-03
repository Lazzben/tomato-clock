import React from "react";
import { Button, Input } from "antd";
import { addTomato, updateTomato } from "../../redux/actions";
import { connect } from "react-redux";
import axios from "../../config/axios";
import CountDown from "./CountDown";
import './tomatoinput.css'

class TomatoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tomatoDesc: "",
      duration: 10 * 1000,
    };
  }

  addTomato(params) {
    axios
      .post("tomatoes", params)
      .then((response) => this.props.addTomato(response.data.resource));
  }

  updateTomato(params) {
    axios
      .put(`tomatoes/${this.props.unfinishedTomato.id}`, params)
      .then((response) => {
        this.props.updateTomato(response.data.resource);
      });
  }

  addTomatoDesc() {
    if (this.state.tomatoDesc === "") return;
    this.updateTomato({
      description: this.state.tomatoDesc,
      ended_at: new Date(),
    });
    this.setState({ tomatoDesc: "" });
  }

  startBtn() {
    return (
      <Button
        className="starttomatobtn"
        type="primary"
        onClick={() => this.addTomato({ duration: this.state.duration })}
      >
        开始番茄
      </Button>
    );
  }

  CountDown(duration, now, startAt) {
    return (
      <div className="countdownwarpper">
        <CountDown
          timer={duration - now + startAt}
          finish={this.forceUpdate.bind(this)}
          duration={this.state.duration}
        />
      </div>
    );
  }

  inputTomato() {
    return (
      <div id="inputwrapper">
        <Input
          value={this.state.tomatoDesc}
          onChange={(e) => this.setState({ tomatoDesc: e.target.value })}
          onPressEnter={this.addTomatoDesc.bind(this)}
        />
      </div>
    );
  }

  renderWhich() {
    if (this.props.unfinishedTomato === undefined) return this.startBtn();
    const now = new Date();
    const startAt = Date.parse(this.props.unfinishedTomato.created_at);
    const duration = this.props.unfinishedTomato.duration;
    return now - startAt > duration
      ? this.inputTomato()
      : this.CountDown(duration, now, startAt);
  }

  render() {
    return <div id="tomatoinput">{this.renderWhich()}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTomato: (payload) => dispatch(addTomato(payload)),
    updateTomato: (payload) => dispatch(updateTomato(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TomatoInput);
