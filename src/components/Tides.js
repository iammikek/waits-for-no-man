import React, {Component} from "react";

import TideEvent from "./TideEvent";

class Tides extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'dailyTides': [],
        }
    }



    filterTides(){


        let days = [];

        this.props.tides.map((tide, i) => {

            let thisDay = tide.DateTime.substr(0, 10);
            let thisDayTime = tide.DateTime.substr(11, 8);

            if (days[thisDay] === undefined) {
                // array empty or does not exist
                days[thisDay] = [];
            }

            return days[thisDay][thisDayTime] = tide;

        });

        return days;

    }


    setTideEvents() {

        if(this.props.tides.length > 0){

            console.log('we have tides');

          //  return this.filterTides();
            return this.props.tides;

        }

        return this.state.dailyTides;
        }

    renderTideEvents() {

        let tideEvents = this.setTideEvents(this.props.tides);

        return tideEvents.map(tideEvent => {

            return (
                <TideEvent className="tideEvent" key={tideEvent.DateTime} tideEvent={tideEvent}>Day
                </TideEvent>
            )
        });

    }

    render() {
        return (
            <div className="tideEvents">
                {this.renderTideEvents()}
            </div>
        )
    }
}

export default Tides;