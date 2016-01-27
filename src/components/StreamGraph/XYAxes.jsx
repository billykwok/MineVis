import React from "react";

import Axis from "./Axis";

class XYAxes extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
    xTick: React.PropTypes.number,
    yTick: React.PropTypes.number,
    xTickFormat: React.PropTypes.func,
    yTickFormat: React.PropTypes.func,
    paddingTop: React.PropTypes.number,
    paddingRight: React.PropTypes.number,
    paddingLeft: React.PropTypes.number,
    paddingBottom: React.PropTypes.number
  };
  static defaultProps = {
    paddingTop: 0, paddingRight: 0, paddingLeft: 0, paddingBottom: 0
  };

  render() {
    const { height, xScale, yScale, xTick, yTick, xTickFormat, yTickFormat,
      paddingTop, paddingBottom } = this.props;
    return (
      <g className="xy-axes">
        <Axis
          translate={`translate(0, ${height - paddingTop - paddingBottom})`}
          scale={xScale}
          orient="bottom"
          ticks={xTick}
          tickFormat={xTickFormat}
        />
        <Axis
          translate={`translate(0, 0)`}
          scale={yScale}
          orient="left"
          ticks={yTick}
          tickFormat={yTickFormat}
        />
      </g>
    );
  }
}

export default XYAxes;
