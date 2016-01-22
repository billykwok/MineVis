import React from "react";
import { style } from "./style.scss";

export class NoMatch extends React.Component {
	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		])
	};

	render() {
		return (
			<div className="">
				<h1>NoMatch</h1>
			</div>
		);
	}
}
