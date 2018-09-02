import React, {Component} from 'react';

import HeightElement from './Height';

class TideEvent extends Component {

    render() {

        let thisDay = this.props.tideEvent.DateTime.substr(0, 10);
        let thisDayTime = this.props.tideEvent.DateTime.substr(11, 5);

        return (
            <div className={this.props.tideEvent.EventType}
                 key={this.props.tideEvent.DateTime}>

                <span>{thisDay}</span><br />
                <span>{thisDayTime} </span>
                <HeightElement height={this.props.tideEvent.Height}/>
            </div>
        )
    }
}


export default TideEvent;