import React from "react";
import d3 from "d3";

import StreamGraph from "../StreamGraph/StreamGraph";

class App extends React.Component {
  state = { data: [], selectedData: 0, streamGraphWidth: 0, radarGraphWidth: 0 };

  componentDidMount() {
    this.updateWidth();
    this.loadData();
    window.addEventListener("optimizedResize", this.onWidthChange);
  }

  componentWillUnmount() {
    window.removeEventListener("optimizedResize", this.onWidthChange);
  }

	render() {
		return (
			<main className="container">
        <h1 className="m-t-2">MineVis</h1>
        <div className="row">
          <div ref="radarGraphContainer" className="col-xs-12">
            <div className="row" style={{ height: 200 }}>
              <div className="col-xs-6">
                <h5>
                  { this.state.selectedData ? ("Server #" + this.state.selectedData) : "Please select server to view..." }
                </h5>
                <p>
                  { "Detail view is coming..." }
                </p>
              </div>
              <div className="col-xs-6">
                <h5>Kill event</h5>
                <p></p>
              </div>
            </div>
          </div>
          <div ref="streamGraphContainer" className="col-xs-12">
            <StreamGraph data={this.state.data} width={this.state.streamGraphWidth} onSelect={this.handleSelect} />
          </div>
        </div>
			</main>
		);
	}

  handleSelect = (serverId) => {
    this.setState({ selectedData: serverId });
  };

  onWidthChange = () => { this.updateWidth(); };
  updateWidth = () => {
    let t;
    if (window.innerWidth < 544) {
      t = window.innerWidth - 30;
    } else if (window.innerWidth < 768) {
      t = 576 - 30;
    } else if (window.innerWidth < 992) {
      t = 720 - 30;
    } else if (window.innerWidth < 1200) {
      t = 940 - 30;
    } else {
      t = 1140 - 30;
    }
    this.setState({
      streamGraphWidth: t,
      radarGraphWidth: this.refs.radarGraphContainer.offsetWidth - 30
    });
  };

  loadData = () => {
    const nest = d3.nest().key(d => d.server_name);
    const stack = d3.layout.stack()
      .offset("silhouette")
      .values(d => d.values)
      .x(d => d.day)
      .y(d => d.total_count);

    d3.csv(require("../../data/by_day_server.csv"), data => {
      this.setState({ data: stack(nest.entries(data.map(d => {
          return {
            server_name: +d.server_name,
            day: +d.day,
            total_count: +d.total_count
          };
        })))
      });
    });
  };
}

export default App;
