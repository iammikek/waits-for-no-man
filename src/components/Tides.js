import React, {Component} from "react"
import TideEvent from "./TideEvent"

import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

import '../css/Tides.css';


ReactChartkick.addAdapter(Chart);

const data = [
    {"name":"Workout", "data": {"2017-01-01": 3, "2017-01-02": 4, "2017-01-04": 1, "2017-01-12": -4}},
];

class Tides extends Component {

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


        const tideData = this.props.tides.map(tideEvent => {
            return (
                <TideEvent className="tideEvent" key={tideEvent.DateTime} tideEvent={tideEvent}>
                </TideEvent>
            )
        });

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
                <div className="prev"> </div>
                <LineChart data={data} />
                {this.renderTideEvents()}
                <div className="next"> </div>
            </div>
        )
    }
}

export default Tides;