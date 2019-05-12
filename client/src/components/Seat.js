import React from 'react';

class Seat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {seats: this.props.seats}
    }

    render() {
        
        const result = this.state.seats.map( item => {
            if(item.seat === "false") return <li></li>
            return <li key={item.row+item.seat}>{item.row}{item.seat}</li>
        });

        return result
    }
}

export default Seat;