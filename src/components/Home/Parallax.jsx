import React from "react";
import ReactDOM from "react-dom";

class Parallax extends React.Component {
	static defaultProps = {
		url: "",
		speed: 0.15
	};
	constructor(props) {
		super(props);
		this.windowHeight = window.height;
		this.dom = null;
		this.state = { yBgPosition: 0 };
		this.scrollHandler = () => {
			const scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			offset = this.dom.getBoundingClientRect().top + scrollTop,
			height = this.dom.offsetHeight;
			if (offset + height <= scrollTop || offset >= scrollTop + this.windowHeight) {
				return;
			}
			this.setState({
				yBgPosition: Math.round((offset - scrollTop) * this.props.speed) * 2
			});
		};
	}
	componentDidMount() {
		document.addEventListener("scroll", this.scrollHandler, false);
		this.dom = ReactDOM.findDOMNode(this.refs.parallaxDiv);
	}
	componentWillUnmount() {
		document.removeEventListener("scroll", this.scrollHandler, false);
		this.dom = null;
	}
	render() {
		return (
			<div ref="parallaxDiv" style={{
					backgroundImage: `url("${this.props.url}")`,
					backgroundPosition: `center ${this.state.yBgPosition * -1}px`
				}}>
				{ this.props.children }
			</div>
		);
	}
	updateBackgroundPosition() {
	}
}

export default Parallax;
