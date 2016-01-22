import React from "react";
import CSSModules from "react-css-modules";
import styles from "./style.scss";

@CSSModules(styles)
export default class Footer extends React.Component {
	render() {
		return (
			<footer styleName="bd-footer">
				<div styleName="container">
					<ul styleName="bd-footer-links">
						<li><a href="https://fb.com/bhkkwok" target="_blank">Facebook</a></li>
						<li><a href="https://twitter.com/xobkwok" target="_blank">Twitter</a></li>
						<li><a href="https://linkedin.com/in/bhkkwok" target="_blank">LinkedIn</a></li>
						<li><a href="https://www.behance.net/xobkwok" target="_blank">Behance</a></li>
						<li><a href="https://github.com/billykwok" target="_blank">GitHub</a></li>
					</ul>
					<p>Designed and developed by <a href="https://fb.com/bhkkwok" target="_blank">Billy Kwok</a> © 2016</p>
					<p>Build with Bootstrap v4.0.0-alpha.2 and React.</p>
				</div>
			</footer>
		);
	}
}
