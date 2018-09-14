import React, {Component} from 'react';

import HeightElement from './Height';

class TideEvent extends Component {

    render() {

        if (!this.props.tideEvent.DateTime) {
            return false;
        }

        let thisDay = this.props.tideEvent.DateTime.substr(0, 10);
        let thisDayTime = this.props.tideEvent.DateTime.substr(11, 5);

        return (
            <div className={this.props.tideEvent.EventType}
                 key={this.props.tideEvent.DateTime}>
                <span className="time">{thisDayTime}</span>
                <HeightElement tideEvent={this.props.tideEvent}/>
            </div>
        )
    }
}


export default TideEvent;