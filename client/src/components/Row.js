import React from 'react';
import Seat from "./Seat";

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            seats: this.props.seats,
            rows: []
        };
    }

    componentDidMount() {
        const rows = [];

        for(let i = 0; i < this.state.seats.length; i++) {
            if (rows.indexOf(this.state.seats[i].row) === -1) rows.push(this.state.seats[i].row)
        }        

        this.setState({
            rows: {rows}
        });
    }

    createRows = () => {
        if(this.state.rows.length === 0) return

        const component = this.state.rows.rows.map( row => {
            return <ul key={row}>{row}</ul>
        });
        return component;

    }

    render() {
        return this.createRows() || ""
    }
}

export default Row;