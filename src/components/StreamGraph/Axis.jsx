import React from "react";
import d3 from "d3";

class Axis extends React.Component {
  static propTypes = {
    translate: React.PropTypes.string,
    scale: React.PropTypes.func,
    ticks: React.PropTypes.number,
    tickFormat: React.PropTypes.func,
    orient: React.PropTypes.oneOf([ "top", "right", "bottom", "left" ])
  };
  static defaultProps = { ticks: 5, tickFormat: d => d, orient: "left" };

  componentDidMount() { this.renderAxis(); }
  componentDidUpdate() { this.renderAxis(); }

  render() {
    let className = "";
    switch (this.props.orient) {
      case "top":
      case "bottom":
        className = "x axis";
        break;
      default:
        className = "y axis";
    }
    return (
      <g ref="axis" className={className} transform={this.props.translate}></g>
    );
  }

  renderAxis() {
    const { orient, scale, ticks, tickFormat } = this.props;
    const axis = d3.svg.axis().ticks(ticks).tickFormat(tickFormat).scale(scale);
    d3.select(this.refs.axis).call(axis.orient(orient));
  }
}

export default Axis;
