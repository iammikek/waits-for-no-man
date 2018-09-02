import React, {Component} from "react";
import './Station.css';
import './Tides.css';

import Tides from './Tides';

class Station extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'tides': [],
            'tideEvents': [{
                "EventType": "LowWater",
                "DateTime": "2018-09-01T03:10:00",
                "IsApproximateTime": false,
                "Height": 0.7043104892979013,
                "IsApproximateHeight": false,
                "Filtered": false
            }, {
                "EventType": "HighWater",
                "DateTime": "2018-09-01T09:13:00",
                "IsApproximateTime": false,
                "Height": 2.5009092313149353,
                "IsApproximateHeight": false,
                "Filtered": false
            }, {
                "EventType": "LowWater",
                "DateTime": "2018-09-01T15:27:00",
                "IsApproximateTime": false,
                "Height": 0.85204562782024429,
                "IsApproximateHeight": false,
                "Filtered": false
            }, {
                "EventType": "HighWater",
                "DateTime": "2018-09-01T21:39:00",
                "IsApproximateTime": false,
                "Height": 2.5776968735219956,
                "IsApproximateHeight": false,
                "Filtered": false
            }]
        }
    }

    getStation = () => {

        console.log('loading' + this.props.currentStation)

        this.setState({tides: this.state.tideEvents})

        console.log(this.state.tides)


    };

    render() {

        let button = '';

        if (this.props.currentStation) {
            button = <button onClick={this.getStation}>Load Station</button>;
        }

        return (
            <div className="station">
                {this.props.currentStation}
                {button}
                <Tides tides={this.state.tides}/>
            </div>
        )
    }
}

export default Station;