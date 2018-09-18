import React, {Component} from "react";
import ReactMapboxGl, {ZoomControl, ScaleControl, Marker, Popup} from "react-mapbox-gl";
import {ReactMapboxGlCluster} from "react-mapbox-gl-cluster";
import Station from "./Station";
import "../css/ClusterMap.css";

import moment from 'moment';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_TOKEN
});

const mapProps = {
    center: {
        lat: 53.4893,
        lng: -5.7099
    },
    zoom: [4],
    style: "mapbox://styles/mapbox/streets-v8"
};

class ClusterMap extends Component {

    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.getStation = this.getStation.bind(this);

        this.state = {
            currentStation: null,
            currentStationId: null,
            stations: {type: 'FeatureCollection', features: []},
            markerCoordinates: [0, 0],
            nextEvent: [],
            favorites: [],
            tides: [],
            tideEvents: [],
            api: process.env.REACT_APP_API
        }
    }

    componentDidMount() {

        this.getStations();

        //  let currentStation = localStorage.getItem('currentStation');
        //  let favorites = localStorage.getItem('favorites');

        //   if (currentStation !== null) {
        //     this.setCurrentStation(currentStation);
        //     console.log(currentStation);
        //  }

        //    if (favorites !== null) {
        //        this.setState({favorites: favorites});
        //    }
    }

    setCurrentStation(currentStation) {

        this.setState({
            currentStation: currentStation.Name,
            currentStationId: currentStation.Id,
            tides: []
        });

        localStorage.setItem('currentStation', currentStation.Name);
        console.log(this.state.currentStation);
    }

    // This method will be sent to the child component
    addToFavorites() {
        console.log('Add to Favorites');
    }

    removeFromFavorites() {
        console.log(this.state.currentStation);
        console.log('Remove from Favorites');
    }


    getTideEvents = () => {

        console.log('getTideEvents');

        fetch(this.state.api + '/stations/' + this.state.currentStationId + '/events/2', {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            }, function (error) {
                console.log(error.message) //=> String
            })
            .then(tideEvents => {
                this.setState({tideEvents});
                console.log(tideEvents);

                this.setNextEvent();

            })
    };

    getStation = () => {
        console.log('loading ' + this.state.currentStation);
        this.getTideEvents();
        this.setState({tides: this.state.tideEvents});
        console.log(this.state.tides);
    };

    getStations = () => {

        console.log('getStations');
        console.log(this.state.api + '/stations');

        fetch(this.state.api + '/stations', {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            }, function (error) {
                console.log(error.message) //=> String
            })
            .then(stations => {
                this.setState({stations});
                console.log(stations);
            })
    };


    setNextEvent() {

        console.log('SET NEXT EVENT');

        const tideData = this.state.tideEvents;

        let data = {};

        for (let i = 0; i < tideData.length; i++) {

            let dateTime = tideData[i].DateTime ? tideData[i].DateTime.replace('T', ' ') : null;
            let event = tideData[i].EventType.replace('Water', ' Water');
            let isNext = moment().isAfter(dateTime);

            data['event'] = event;
            data['height'] = Boolean(tideData[i].Height) ? tideData[i].Height.toFixed(2) + 'm' : '';
            data['isNext'] = isNext;
            data['eventTime'] = moment(dateTime).isValid() ? ' at ' + moment(dateTime).format("HH:mm") : null;
            data['inTime'] = moment(dateTime).isValid() ? moment(dateTime).fromNow() : null;

            if (isNext === false) {
                break;
            }
        }

        this.setState({
            nextEvent: data
        });
    }


    getEventHandlers() {
        return {
            onClick: (properties, coords, offset) => {

                this.setState({
                    markerCoordinates: coords,
                    nextEvent: []
                });

                this.setCurrentStation(properties);
                this.getStation();
            },
        };
    }

    render() {

        let markerTarget = '';

        if (this.state.markerCoordinates.length > 0) {
            markerTarget = <div className="target">
                <Station currentStation={this.state.currentStation}
                         actionGetStation={this.getStation}
                         actionAddFavorite={this.addToFavorites}
                         actionRemoveFavorite={this.removeFromFavorites}
                         nextEvent={this.state.nextEvent}
                />
            </div>
        }

        //  return '';

        return (
            <div className="ClusterMap">
                <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
                    <ReactMapboxGlCluster
                        data={this.state.stations}
                        {...this.getEventHandlers()}
                    >
                    </ReactMapboxGlCluster>
                    <ZoomControl/>
                    <ScaleControl/>
                    <Marker className='marker'
                            coordinates={this.state.markerCoordinates}
                            anchor="bottom"
                    >
                    </Marker>

                    {this.state.currentStationId && (
                        <Popup key={this.state.currentStationId}
                               coordinates={this.state.markerCoordinates}>
                            {markerTarget}
                        </Popup>
                    )}
                </Map>
            </div>
        );
    }
}

export default ClusterMap