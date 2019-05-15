import React from 'react';
import SeatsInRow from "./SeatsInRow";

class Rows extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            seats: this.props.seats,
            rows: []
        };
        this.seatElement = React.createRef();
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
            const seats = this.state.seats.filter( item => {
                if(item.row === row) return item
                return false;
            });
            return <ul key={row}>{row}<SeatsInRow seats={seats} selectSeat={this.props.selectSeat} ref={this.props.innerRef} /></ul>
        });
        return component;

    }

    render() {
        return this.createRows() || ""
    }
}

export default React.forwardRef((props, ref) => <Rows innerRef={ref} {...props}/>);