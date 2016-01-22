import React from "react";
import CSSModules from "react-css-modules";
import styles from "./style.scss";

@CSSModules(styles, { allowMultiple: true })
export default class Card extends React.Component {
	render() {
		return (
			<div styleName="card">
				<img styleName="card-img-top" src={this.props.imgUrl} />
				<div styleName="card-block">
					{this.props.children}
				</div>
			</div>
		);
	}
}
