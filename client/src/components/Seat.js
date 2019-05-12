import React from 'react';

class Seat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seats: this.props.seats,
            backColor: ""
        }

        this.setColor = this.setColor.bind(this);
        this.selectSeat = this.selectSeat.bind(this);
    }

    selectSeat = (e) => {
        e.preventDefault()

        console.log(e.target.innerText)

        //this.setColor();
    }

    setColor = () => {
        const color = this.state.backColor === "#1e8073" ? "#345f9e" : "#1e8073";
        this.setState({backColor: color})
    }

    render() {
        let i = 0;
        const result = this.state.seats.map( item => {
            if(item.seat === "false") {
                i++;
                return <li key={"empty-"+item.row+i} style={{backgroundColor:"#888"}}></li>   
            }

            if(item.isOccupied === true) {
                return (
                    <li key={item.row+item.seat} style={{backgroundColor:"#ac3838"}}>
                        {item.row+item.seat}
                    </li>
                )
            }

            return (
                <li 
                    style={{backgroundColor:this.state.backColor}}
                    key={item.row+item.seat} 
                    onClick={this.selectSeat}>
                    {item.row+item.seat}
                </li>
            )
        });

        return result
    }
}

export default Seat;