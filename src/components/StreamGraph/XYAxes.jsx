import React from "react";
import d3 from "d3";

import Axis from "./Axis";

class XYAxes extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired,
    paddingTop: React.PropTypes.number,
    paddingRight: React.PropTypes.number,
    paddingLeft: React.PropTypes.number,
    paddingBottom: React.PropTypes.number
  };
  static defaultProps = {
    paddingTop: 0, paddingRight: 0, paddingLeft: 0, paddingBottom: 0
  };

  render() {
    const { height, xScale, yScale,
      paddingTop, paddingBottom } = this.props;
    return (
      <g className="xy-axes">
        <Axis
          translate={`translate(0, ${height - paddingTop - paddingBottom + 5})`}
          scale={xScale}
          orient="bottom"
          ticks={14}
          tickFormat={d => "Day " + d}
        />
        <Axis
          translate={`translate(0, 5)`}
          scale={yScale}
          orient="left"
          ticks={5}
          tickFormat={d => {
            const prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          }}
        />
      </g>
    );
  }
}

export default XYAxes;
