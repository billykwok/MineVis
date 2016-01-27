import React from "react";
import d3 from "d3";

import "./style.scss";
import Container from "../StreamGraph/Container";
import Chart from "./Chart";
import XYAxes from "../StreamGraph/XYAxes";

const propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  hoveredDay: React.PropTypes.number, withYAxis: React.PropTypes.bool,
  width: React.PropTypes.number, height: React.PropTypes.number,
  paddingTop: React.PropTypes.number, paddingRight: React.PropTypes.number,
  paddingBottom: React.PropTypes.number, paddingLeft: React.PropTypes.number,
  marginTop: React.PropTypes.number, marginRight: React.PropTypes.number,
  marginBottom: React.PropTypes.number, marginLeft: React.PropTypes.number,
  onServerHover: React.PropTypes.func.isRequired
};
const defaultProps = {
  data: [], hoveredDay: 1, withYAxis: true, width: 320, height: 180,
  paddingTop: 5, paddingRight: 5, paddingBottom: 30, paddingLeft: 5,
  marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0
};

class HorizontalBarChart extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  shouldComponentUpdate(nextProps) {
    return nextProps.hoveredDay !== this.props.hoveredDay;
  }

  render() {
    const { withYAxis, width, height,
      paddingTop, paddingRight, paddingBottom, paddingLeft } = this.props;
    const xAxisHeight = 30;
    const yAxisWidth = withYAxis ? 30 : 0;
    const x = this.getXScale(width - yAxisWidth, paddingLeft, paddingRight);
    const y = this.getYScale(height, paddingTop, paddingBottom);
    const { data, hoveredDay, onServerHover, ...rest } = this.props;
    return (
      <Container {...rest} xAxisHeight={xAxisHeight} yAxisWidth={yAxisWidth}>
        <Chart xScale={x} yScale={y} data={data} onSelect={onServerHover} currentDay={hoveredDay} />
        <XYAxes {...rest} xScale={x} yScale={y} xTick={10} yTick={0} xTickFormat={this.getXTickFormat} yTickFormat={this.getYTickFormat} />
      </Container>
    );
  }

  getXTickFormat = d => d;
  getYTickFormat = d => d;
  getXScale(width, paddingLeft, paddingRight) {
    return d3.scale.linear()
      .domain([ 0, d3.max(this.props.data, d => d3.max(d.values, t => t.values[4].perPlayerCount)) ])
      .range([ 0, width - paddingLeft - paddingRight ]);
  }
  getYScale(height, paddingTop, paddingBottom) {
    return d3.scale.ordinal()
      .domain(Array.apply(null, new Array(14)).map((d, i) => i + 1))
      .rangeBands([ 0, height - paddingTop - paddingBottom ]);
  }
}

export default HorizontalBarChart;
