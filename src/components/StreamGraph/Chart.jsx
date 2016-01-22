import React from "react";
import d3 from "d3";
import _ from "lodash";

import Layer from "./Layer";

// const colorRange = [
//   "#980043",
//   "#DD1C77",
//   "#DF65B0",
//   "#C994C7",
//   "#D4B9DA",
//   "#F1EEF6"
// ];

class Chart extends React.Component {
  static propTypes = {
    area: React.PropTypes.func.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };
  state = { topLayer: 1 };

  render() {
    const sorted = _.sortBy(this.props.data, row => +row.key === this.state.topLayer);
    return (
      <g ref="chart" className="chart-area">
        {
          sorted.map(row => {
            return (<Layer
              key={"layer" + row.key}
              data={row}
              area={this.props.area(row.values)}
              color={this.getColor(+row.key)}
              requestReOrdering={this.reOrder}
            />);
          })
        }
        {
          sorted.map(row => {
            const itemMaxHeight = _.max(row.values, v => v.y);
            const x = this.props.xScale(itemMaxHeight.day);
            const y = this.props.yScale(itemMaxHeight.y0 + itemMaxHeight.y / 2);
            return this.props.yScale(itemMaxHeight.y) < 360 ?
              <text className="layer-label" key={"label" + row.key} textAnchor="middle" x={x} y={y}>
                {"Server " + row.key}
              </text> : null;
          })
        }
      </g>
    );
  }

  getColor = d3.scale.category20c();
  reOrder = (top) => {
    this.setState({ topLayer: +top });
    this.props.onSelect(+top);
  };
}

export default Chart;
