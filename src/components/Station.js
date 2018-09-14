import React, {Component} from "react";
import '../css/Station.css';

import Tides from './Tides';

class Station extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'tides': []
        }
    }

    componentDidMount() {
        console.log('station mounted');
    }

    componentDidUpdate(prevProps) {

        // unset tides if we change the currentStation
        if (prevProps.currentStation !== this.props.currentStation) {
            console.log('changed Station');
        }
    }

    render() {

        let button = '';
        let tides = '';

        if (this.props.currentStation) {
            button = <div className="buttons">
                <button onClick={this.props.actionGetStation}>Tides</button>
                <button onClick={this.props.actionAddFavorite}>+</button>
                <button onClick={this.props.actionRemoveFavorite}>-</button>
            </div>;
        }

        if (this.props.tides.length > 0) {
            tides = <Tides tides={this.props.tides}/>
        }

        return (
            <div className="station">
                {this.props.currentStation}
                {button}
                {tides}
            </div>
        )
    }
}

export default Station;
