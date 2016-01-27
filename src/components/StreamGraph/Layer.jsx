import React from "react";

class Layer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    area: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    requestReOrdering: React.PropTypes.func
  };
  static defaultProps = { requestReOrdering: () => {} };
  state = { isHovered: false };

  render() {
    const className = this.state.isHovered ? "layer hover" : "layer";
    return (
      <path
        className={className}
        d={this.props.area}
        fill={this.props.color}
        stroke={this.state.isHovered ? "black" : ""}
        strokeWidth={this.state.isHovered ? 2 : 0}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleUnhover}
      />
    );
  }

  handleHover = () => {
    this.setState({ isHovered: true });
    this.props.requestReOrdering(this.props.data.key);
  };

  handleUnhover = () => {
    this.setState({ isHovered: false });
    // this.props.requestReOrdering(0);
  };
}

export default Layer;
