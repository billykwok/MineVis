import React from "react";
import d3 from "d3";
import _ from "lodash";

import Layer from "./Layer";

class Chart extends React.Component {
  static propTypes = {
    area: React.PropTypes.func.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
    onServerHover: React.PropTypes.func.isRequired,
    onDayHover: React.PropTypes.func.isRequired
  };
  state = { hoveredServer: 0, hoveredDay: 1 };

  render() {
    const sorted = _.sortBy(this.props.data, row => +row.key === this.state.hoveredServer);
    return (
      <g ref="chart" className="chart-area" onMouseMove={_.throttle(this.handleMouseMove, 100)}>
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
            return this.props.yScale(itemMaxHeight.y) < this.props.yScale(200000) ?
              <text className="layer-label" key={"label" + row.key} textAnchor="middle" x={+row.key === 2 ? x - 20 : x} y={+row.key === 10 ? y + 18 : y + 8}>
                {"Server " + row.key}
              </text> : null;
          })
        }
      </g>
    );
  }

  handleMouseMove = (e) => {
    const posX = e.clientX - this.refs.chart.getBoundingClientRect().left;
    const newDay = Math.round(this.props.xScale.invert(posX));
    this.setState({ hoveredDay: newDay });
    this.props.onDayHover(this.state.hoveredDay);
  };
  getColor = d3.scale.category20c();
  reOrder = (top) => {
    this.setState({ hoveredServer: +top });
    this.props.onServerHover(+top);
  };
}

export default Chart;
