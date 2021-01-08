import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.PureComponent {

	state = {
		positionX: 0,
		value: this.props.value,
		min: this.props.min,
		max: this.props.max
	}

	sliderRef = React.createRef();

	onDrugStart = (e) => {
		this.startX = e.clientX
		document.body.addEventListener('mousemove', this.onDrug)
		document.body.addEventListener('mouseup', this.onDrugEnd)
	}

	componentDidMount() {
		let dragPosition = this.sliderRef.current.offsetWidth * this.state.value / this.state.max
		this.setState({positionX: dragPosition - 5})
	}

	onDrug = (e) => {
		let value = this.state.max * (e.clientX) / this.sliderRef.current.offsetWidth;
		let position = (this.sliderRef.current.offsetWidth * this.state.value / this.state.max) -5;
		this.setState({positionX: position, value: Math.round(value)})
	}

	onDrugEnd = () => {
		document.body.removeEventListener('mousemove', this.onDrug)
		document.body.removeEventListener('mouseup', this.onDrug)
	}

	sliderHandler = (e) => {
		if (e.target.value < 100) {
			this.setState({positionX: -5})
		} else if (e.target.value > this.state.max) {
			this.setState({positionX: this.sliderRef.current.offsetWidth - 5})
		} else {
			const result = (this.sliderRef.current.offsetWidth * e.target.value / this.state.max) - 5
			this.setState({positionX: result, value: e.target.value})
		}
	}

	render() {
		return (
			<>
				<Root ref={this.sliderRef}>
					<Input onChange={this.sliderHandler} type="number"/>
					<Bar>
						<Handler onMouseDown={this.onDrugStart} positionX={this.state.positionX}>
							<Value>
								{this.state.value}
							</Value>
						</Handler>
					</Bar>
				</Root>
				<div style={{width: '25%', background: 'red', height: '3px', marginTop: '15px'}}></div>
				<div style={{width: '50%', background: 'blue', height: '3px', marginTop: '15px'}}></div>
				<div style={{width: '75%', background: 'purple', height: '3px', marginTop: '15px'}}></div>
			</>
		);
	}
}


//region ====================== Styles ========================================

const Root = styled.div`
	padding: 10px 0;
`;

const Bar = styled.div`
	position: relative;
	height: 2px;
	background-color: black;
	margin-top: 10px;
`;

const Handler = styled.div.attrs(props => ({
		style: {
			left: `${props.positionX}px`
		}
	}
))`
	position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
	background-color: red;
	cursor: pointer;
	top: -4px;
`;

const Input = styled.input`
	::-webkit-inner-spin-button {
			-webkit-appearance: none; 
			margin: 0; 
	}
	::-webkit-outer-spin-button {
			-webkit-appearance: none; 
			margin: 0; 
	}  
`

const Value = styled.div`
	position: relative;
	top: 11px;
	left: -9px;
`

//endregion