import React from "react";

function translate(x, y) { return `translate(${x}, ${y})`; }

const Chart = props => {
  const { children, width, height, xAxisHeight, yAxisWidth,
    marginTop, marginRight, marginLeft, marginBottom,
    paddingTop, paddingRight, paddingLeft, paddingBottom } = props;
  const containerStyle = {
    width: width + marginLeft + marginRight,
    height: height + marginTop + marginBottom
  };

  return (
    <div className="chart" style={containerStyle}>
      <svg
        width={width}
        height={height}
        transform={translate(marginLeft, marginTop)}
      >
        <g
          width={width - yAxisWidth - paddingLeft - paddingRight}
          height={height - xAxisHeight - paddingTop - paddingBottom}
          transform={translate(paddingLeft + yAxisWidth, paddingTop)}
        >
        { children }
        </g>
      </svg>
    </div>
  );
};

Chart.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  xAxisHeight: React.PropTypes.number,
  yAxisWidth: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  marginTop: React.PropTypes.number,
  marginRight: React.PropTypes.number,
  marginLeft: React.PropTypes.number,
  marginBottom: React.PropTypes.number,
  paddingTop: React.PropTypes.number,
  paddingRight: React.PropTypes.number,
  paddingLeft: React.PropTypes.number,
  paddingBottom: React.PropTypes.number
};

export default Chart;
