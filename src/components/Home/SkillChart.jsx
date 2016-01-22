import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";

const data = {
	labels: [
		"UI/UX Design",
		"Website",
		"Mobile",
		"Electronics",
		"Startup"
	],
	datasets: [
		{
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "#637b85",
			pointColor: "#fafafa",
			pointStrokeColor: "#637b85",
			data: [ 8, 8, 7, 6, 7 ]
		}
	]
};

class SkillChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { skillChart: null };
	}
	componentDidMount() {
		const canvas = ReactDOM.findDOMNode(this.refs.skillChart),
		ctx = canvas.getContext("2d");
		this.setState({
			skillChart: new Chart(ctx).Radar(data, {
				responsive: true,
				scaleOverride: true,
				scaleSteps: 3,
				scaleStepWidth: 3,
				pointLabelFontSize: 16,
				pointDotRadius: 5,
				pointDotStrokeWidth: 3,
				datasetStrokeWidth: 3
			})
		});
	}
	render() {
		return (
			<div className="skill-chart-container">
				<canvas className="skill-chart" ref="skillChart"></canvas>
			</div>);
		}
	}

	export default SkillChart;
