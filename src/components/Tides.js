import React, {Component} from "react"
import TideEvent from "./TideEvent"

import ReactChartkick, {AreaChart, LineChart} from 'react-chartkick'
import Chart from 'chart.js'

import '../css/Tides.css';

ReactChartkick.addAdapter(Chart);

class Tides extends Component {


    constructor(props) {
        super(props);

        this.state = {
            'tideData': [],
            'tides': [],
        }
    }


    componentDidUpdate(prevProps, prevState) {

    }

    filterTides() {

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

    renderTideEvents() {

        const tideData = this.props.tides;

        let data = {};

        for (let i = 0; i < tideData.length; i++) {

            let dateTime = tideData[i].DateTime.replace('T', ' ');
            let height = tideData[i].Height;

            if (Boolean(height)) {
                height = height.toFixed(2);
            }

            data[dateTime] = height;
        }

        return (
            <LineChart width="400px" height="100px" data={data}/>
        );


        return this.props.tides.map(tideEvent => {

            return (
                <TideEvent className="tideEvent" key={tideEvent.DateTime} tideEvent={tideEvent}>
                </TideEvent>
            )
        });

    }

    render() {
        return (
            <div className="tideEvents">
                <div className="prev"></div>


                {this.renderTideEvents()}
                <div className="next"></div>
            </div>
        )
    }
}

export default Tides;