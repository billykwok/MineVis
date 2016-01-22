import React from "react";
import d3 from "d3";

import "./style.scss";
import Container from "./Container";
import Chart from "./Chart";
import XYAxes from "./XYAxes";

const propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  withYAxis: React.PropTypes.bool,
  width: React.PropTypes.number, height: React.PropTypes.number,
  paddingTop: React.PropTypes.number, paddingRight: React.PropTypes.number,
  paddingBottom: React.PropTypes.number, paddingLeft: React.PropTypes.number,
  marginTop: React.PropTypes.number, marginRight: React.PropTypes.number,
  marginBottom: React.PropTypes.number, marginLeft: React.PropTypes.number,
  onSelect: React.PropTypes.func.isRequired
};
const defaultProps = {
  data: "", withYAxis: true, width: 640, height: 420,
  paddingTop: 10, paddingRight: 5, paddingBottom: 30, paddingLeft: 5,
  marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0
};

class StreamGraph extends React.Component {
	static propTypes = propTypes;
  static defaultProps = defaultProps;

	render() {
    const { withYAxis, width, height,
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

    return (
      <Container xAxisHeight={xAxisHeight} yAxisWidth={yAxisWidth} {...this.props}>
        <Chart xScale={x} yScale={y} data={this.props.data} onSelect={this.props.onSelect} area={area} />
        <XYAxes xScale={x} yScale={y} {...this.props}/>
      </Container>
    );
  }

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
