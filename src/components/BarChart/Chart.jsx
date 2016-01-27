import React from "react";
import d3 from "d3";
// import _ from "lodash";

class Chart extends React.Component {
  static propTypes = {
    currentDay: React.PropTypes.number,
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired
    // onSelect: React.PropTypes.func.isRequired
  };
  static defaultProps = { currentDay: 1 };

  shouldComponentUpdate(nextProps) {
    return nextProps.currentDay !== this.props.currentDay;
  }

  render() {
    return (
      <g ref="chart" className="chart-area">
        {
          this.props.data.length ? this.props.data[this.props.currentDay - 1].values.map(row => {
              return (<rect
                key={"server_" + row.key}
                width={this.props.xScale(row.values[4].perPlayerCount)}
                height={this.props.yScale.rangeBand()}
                x={0}
                y={this.props.yScale(+row.key)}
                fill={this.getColor(+row.key)}
              />);
            }) : null
        }
      </g>
    );
  }
  getColor = d3.scale.category20c();
}

export default Chart;
