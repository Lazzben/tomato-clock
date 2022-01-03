import React from "react";
import TomatoInput from "./TomatoInput";
import {connect} from 'react-redux'
import {format} from 'date-fns'
import './tomatos.css'
import TomatosList from "./TomatosList";

class Tomatos extends React.Component {
  constructor(props) {
    super(props);
  }

  get unfinishedTomato(){
      return this.props.tomatos.filter((tomato)=> !tomato.description && !tomato.ended_at && !tomato.aborted)[0]
  }

  get finishedTomatos(){
    let finishedTomatos =  this.props.tomatos.filter((tomato)=> tomato.description && tomato.ended_at && !tomato.aborted);
    let finishedTomatosGroupByStartDate = {}
    finishedTomatos.forEach((tomato)=>{
      let parsedDate = format(Date.parse(tomato.started_at), 'yyyy/MM/dd')
      if(parsedDate in finishedTomatosGroupByStartDate) {
        finishedTomatosGroupByStartDate[parsedDate].push(tomato)
      }else {
        finishedTomatosGroupByStartDate[parsedDate] = [tomato]
      }
    })
    return finishedTomatosGroupByStartDate;
  }

  render() {
    return (
      <div id="tomatos">
        <TomatoInput unfinishedTomato={this.unfinishedTomato}/>
        <TomatosList finishedTomatos={this.finishedTomatos}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tomatos: state.tomatos
  };
}

export default connect(mapStateToProps, undefined)(Tomatos);
