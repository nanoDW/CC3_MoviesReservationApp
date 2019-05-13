import React from 'react';

class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seatNumber: this.props.seatNumber,
            backColor: "#345f9e"
        }
    }

    selectSeat = (e) => {
        e.preventDefault()
		
        this.props.selectSeat(e.target.innerText)
		
        this.setColor();
    }

    setColor = () => {
        const color = this.state.backColor === "#1e8073" ? "#345f9e" : "#1e8073";
        this.setState({backColor: color})
    }

    render() {
            return (
                <li 
                    style={{backgroundColor:this.state.backColor}}
                    key={this.state.seatNumber}
                    onClick={this.selectSeat}>
                    {this.state.seatNumber}
                </li>
            )};
    }

export default Seat;