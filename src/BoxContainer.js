import React, { Component } from 'react';
import ColoredBox from './ColoredBox';

class BoxContainer extends Component {
    constructor (props) {
        super (props);
        this.state = {
            showBox: true
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({ showBox: false })
        }, 7500);
    }

    
    render () {
        let markup = <div>Nothing to see here</div>
        if(this.state.showBox){
            markup = <ColoredBox />
        }

        return markup;
    }
}

export default BoxContainer;