import React, {Component} from "react";
import '../css/Station.css';

class Station extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tides: [],
        }
    }

    componentDidMount() {
        console.log('station mounted');
    }

    componentDidUpdate(prevState, prevProps) {
        // unset tides if we change the currentStation
        if (prevProps.currentStation !== this.props.currentStation) {
            console.log('changed Station');
        }
    }

    render() {

        return (
            <div className="station">
                <h1>{this.props.currentStation}</h1>
                <div> {this.props.nextEvent.event} {this.props.nextEvent.inTime}</div>
                <div>{this.props.nextEvent.height}
                    {this.props.nextEvent.eventTime}
                </div>
            </div>
        )
    }
}

export default Station;
