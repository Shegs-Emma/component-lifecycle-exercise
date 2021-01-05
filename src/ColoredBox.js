import React, { Component } from 'react';

class ColoredBox extends Component {
    constructor (props) {
        super (props);
        this.state = {
            backgroundColor: "yellow",
            intervalId: null
        }
    }

    componentDidMount(){
        const intervalId = setInterval(() => {
            this.setState((prevState, props) => {
                const backgroundColor = prevState.backgroundColor === "yellow" ? "red" : "yellow";
                console.log(`changing color to ${backgroundColor}`);

                return { backgroundColor }
            });
        }, 1000);
        this.setState({ intervalId })
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
        console.log(`Interval ${this.state.intervalId} has been cleared`)
    }

    render () {
        const style = {
            width: "100px",
            height: "100px",
            backgroundColor: this.state.backgroundColor
        }

        return <div style={style} />
    }
}

export default ColoredBox;