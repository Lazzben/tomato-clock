import React from "react";
import { format } from "date-fns";
import './tomatoslist.css'

class TomatosList extends React.Component {
  get dates() {
    return Object.keys(this.props.finishedTomatos);
  }

  tomatoItem(tomato) {
    return (
      <div className="tomatoitem" key={tomato.started_at}>
        <span className="time">
          {format(Date.parse(tomato.started_at), "HH:mm")} -{" "}
          {format(Date.parse(tomato.ended_at), "HH:mm")}
        </span>
        <span className="description">{tomato.description}</span>
      </div>
    );
  }

  tomatosList() {
    return this.dates.map((date) => {
      let tomatos = this.props.finishedTomatos[date];
      return (
        <div className="dailytomato" key={date}>
          <div className="title">
            <span className="date">
              {format(Date.parse(date), "yyyy年M月d日")}
            </span>
            <span className="finishedcount">
              完成了{tomatos.length}个番茄时间
            </span>
          </div>
          <div className="details">
            {tomatos.map((tomato) => this.tomatoItem(tomato))}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div id="tomatoslist">{this.tomatosList()}</div>;
  }
}

export default TomatosList;
