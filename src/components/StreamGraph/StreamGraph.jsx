import React from "react";
import d3 from "d3";

import "./style.scss";
import Container from "./Container";
import Chart from "./Chart";
import XYAxes from "./XYAxes";
import Vertical from "./Vertical";

const propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  hoveredDay: React.PropTypes.number, withYAxis: React.PropTypes.bool,
  width: React.PropTypes.number, height: React.PropTypes.number,
  paddingTop: React.PropTypes.number, paddingRight: React.PropTypes.number,
  paddingBottom: React.PropTypes.number, paddingLeft: React.PropTypes.number,
  marginTop: React.PropTypes.number, marginRight: React.PropTypes.number,
  marginBottom: React.PropTypes.number, marginLeft: React.PropTypes.number,
  onServerHover: React.PropTypes.func.isRequired,
  onDayHover: React.PropTypes.func.isRequired
};
const defaultProps = {
  data: [], hoveredDay: 1, withYAxis: true, width: 640, height: 420,
  paddingTop: 5, paddingRight: 25, paddingBottom: 30, paddingLeft: 5,
  marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0
};

class StreamGraph extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const { hoveredDay, withYAxis, width, height,
      paddingTop, paddingRight, paddingBottom, paddingLeft } = this.props;
    const xAxisHeight = 30;
    const yAxisWidth = withYAxis ? 30 : 0;
    const x = this.getXScale(width - yAxisWidth, paddingLeft, paddingRight);
    const y = this.getYScale(height, paddingTop, paddingBottom);

    const area = d3.svg.area()
      .interpolate("cardinal")
      .x(d => x(d.day))
      .y0(d => y(d.y0))
      .y1(d => y(d.y0 + d.y));
    const { data, onServerHover, onDayHover, ...rest } = this.props;
    return (
      <Container {...rest} xAxisHeight={xAxisHeight} yAxisWidth={yAxisWidth}>
        <Chart xScale={x} yScale={y} data={data} area={area} onServerHover={onServerHover} onDayHover={onDayHover} />
        <XYAxes {...rest} xScale={x} yScale={y} xTick={14} yTick={5} xTickFormat={this.getXTickFormat} yTickFormat={this.getYTickFormat} />
      <Vertical x={x(hoveredDay)} height={height - 35} />
      </Container>
    );
  }

  getXTickFormat = d => "Day " + d;
  getYTickFormat = d => {
    const prefix = d3.formatPrefix(d);
    return prefix.scale(d) + prefix.symbol;
  };
  getXScale(width, paddingLeft, paddingRight) {
    return d3.scale.linear()
      .domain([
        d3.min(this.props.data, d => d3.min(d.values, t => t.day)),
        d3.max(this.props.data, d => d3.max(d.values, t => t.day))
      ])
      .rangeRound([ 0, width - paddingLeft - paddingRight ]);
  }
  getYScale(height, paddingTop, paddingBottom) {
    return d3.scale.linear()
      .domain([
        0,
        d3.max(this.props.data, d => d3.max(d.values, t => t.y0 + t.y))
      ])
      .range([ height - paddingTop - paddingBottom, 0 ]);
  }
}

export default StreamGraph;
