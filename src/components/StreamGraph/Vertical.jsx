import React from "react";

class Vertical extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    height: React.PropTypes.number.isRequired
  };
  static defaultProps = { x: 0 };
  state = { isHovered: false };

  render() {
    const { x, height } = this.props;
    return (
      <line className="vertical" x1={x || 0} y1={0} x2={x || 0} y2={height} style={{ stroke: "#ccc", strokeWidth: 2 }} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} />
    );
  }

  handleMouseOver = () => { this.setState({ isHovered: true }); };
  handleMouseOver = () => { this.setState({ isHovered: false }); };
}

export default Vertical;
