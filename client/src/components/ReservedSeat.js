import React from 'react';

class ReservedSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seatRow: this.props.seatRow,
            seatNumber: this.props.seatNumber,
            backColor: "#ac3838"
        }
    }

    render() {
            return (
                <li 
                    style={{backgroundColor:this.state.backColor}}
                    key={this.state.seatNumber}>
                    {this.state.seatRow+this.state.seatNumber}
                </li>
            )};
    }

export default ReservedSeat;