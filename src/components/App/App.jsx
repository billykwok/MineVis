import React from "react";

import loadData from "../../others/dataImport";
import EventSelect from "../EventSelect/EventSelect";
import BarChart from "../BarChart/BarChart";
import StreamGraph from "../StreamGraph/StreamGraph";

class App extends React.Component {
  state = {
    barChartData: [],
    streamGraphData: [],
    hoveredServer: 0,
    hoveredDay: 1,
    streamGraphWidth: 0,
    radarGraphWidth: 0
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("optimizedResize", this.onWidthChange);
    loadData((src) => { this.setState(src); });
  }

  componentWillUnmount() {
    window.removeEventListener("optimizedResize", this.onWidthChange);
  }

  render() {
    return (
      <main className="container">
        <h1 className="m-t-1">MineVis - {this.state.hoveredServer ? "Server #" + this.state.hoveredServer : "______"}</h1>
        <div className="row">
          <div ref="radarGraphContainer" className="col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-4">
                <h5>Cross-server Comparison</h5>
                <p className="m-b-0"></p>

                <BarChart data={this.state.barChartData} width={350} height={220} onServerHover={this.handleServerHover} hoveredDay={this.state.hoveredDay} />
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <h5>Server Overview</h5>
                <p></p>
                <BarChart data={this.state.barChartData} width={350} height={220} onServerHover={this.handleServerHover} hoveredDay={this.state.hoveredDay} />
              </div>
              <div className="col-xs-12 col-md-12 col-lg-4">
                <h5>Kill event</h5>
                <p></p>
              </div>
            </div>
          </div>
          <div ref="streamGraphContainer" className="col-xs-12">
            <StreamGraph data={this.state.streamGraphData} hoveredDay={this.state.hoveredDay} width={this.state.streamGraphWidth} height={360} onServerHover={this.handleServerHover} onDayHover={this.handleDayHover}/>
          </div>
        </div>
      </main>
    );
  }

  handleServerHover = (serverId) => { this.setState({ hoveredServer: serverId }); };
  handleDayHover = (day) => { if (day !== this.state.hoveredDay) this.setState({ hoveredDay: day }); };
  onWidthChange = () => { this.updateWidth(); };
  updateWidth = () => {
    let t = 0;
    if (window.innerWidth < 544) t = window.innerWidth - 30;
    else if (window.innerWidth < 768) t = 576 - 30;
    else if (window.innerWidth < 992) t = 720 - 30;
    else if (window.innerWidth < 1200) t = 940 - 30;
    else t = 1140 - 30;
    this.setState({
      streamGraphWidth: t,
      radarGraphWidth: this.refs.radarGraphContainer.offsetWidth - 30
    });
  };
}

export default App;
