import React from "react";
import { Link } from "react-router";
import CSSModules from "react-css-modules";
import styles from "./style.scss";

@CSSModules(styles, { allowMultiple: true })
export default class Navbar extends React.Component {
	static propTypes = { isOpaque: React.PropTypes.bool }
	render() {
		return (
			<header styleName="navbar navbar-fixed-top navbar-dark bg-inverse">
				<div styleName="container">
					<span styleName="navbar-brand">
						<Link to="/"><img src={require("../../../img/logo.png")} /></Link>
					</span>
					<button styleName="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#bd-main-nav">&#9776;</button>
					<div styleName="collapse navbar-toggleable-xs pull-xs-right" id="bd-main-nav">
						<nav styleName="nav navbar-nav">
							<span styleName="nav-item nav-link active"><Link to="/">Home</Link></span>
							{ /* <span styleName="nav-item nav-link"><Link to="/story">My Story</Link></span> */ }
							<span styleName="nav-item nav-link"><Link to="/design">Design</Link></span>
							<span styleName="nav-item nav-link"><Link to="/tech">Tech</Link></span>
							<span styleName="nav-item nav-link"><Link to="/contact">Contact</Link></span>
						</nav>
					</div>
				</div>
			</header>
		);
	}
}
