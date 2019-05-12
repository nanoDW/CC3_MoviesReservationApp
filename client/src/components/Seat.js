import React from 'react';

class Seat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {seats: this.props.seats}
    }

    selectSeat = (e) => {
        e.preventDefault()
        console.log(e.target.innerText)
    }

    render() {
        const result = this.state.seats.map( item => {
            if(item.seat === "false") return <li style={{backgroundColor:"#888"}}></li>

            return <li 
                key={item.row+item.seat} 
                onClick={this.selectSeat}>
                {item.row}{item.seat}
            </li>
        });

        return result
    }
}

export default Seat;