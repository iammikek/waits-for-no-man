import React, {Component} from "react";
import ReactMapboxGl, {ZoomControl, ScaleControl, Marker, Popup, RotationControl} from "react-mapbox-gl";
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
    pitch: [30], // pitch in degrees
    bearing: [0], // bearing in degrees
    zoom: [5],
    style: "mapbox://styles/brightstormltd/cjmaltjaygsb92sqqpg2b5i3j"
};

const FetchOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'omit',
    headers: {
        'X-AUTH-TOKEN': process.env.REACT_APP_API_TOKEN
    }
};

class ClusterMap extends Component {

    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.getStation = this.getStation.bind(this);

        this.state = {
            api: process.env.REACT_APP_API,
            proxyUrl: process.env.REACT_APP_PROXY,
            apiToken: process.env.REACT_APP_API_TOKEN,
            currentStation: null,
            currentStationId: null,
            stations: {
                type: 'FeatureCollection', features: []
            },
            markerCoordinates: [0, 0],
            nextEvent: [],
            favorites: [],
            tides: [],
            tideEvents: []
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

        let targetUrl = this.state.api + '/stations/' + this.state.currentStationId + '/events/2';

        console.log(FetchOptions);

        fetch(this.state.proxyUrl + targetUrl, FetchOptions)
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

        let targetUrl = this.state.api + '/stations';

        console.log(FetchOptions);

        fetch(this.state.proxyUrl + targetUrl, FetchOptions)
            .then(response => {

                if (response.status === 401) {
                    this.setState({error: 'Cannot connect to API'});
                    return this.state.stations;
                }

                return response.json();
            }, function (error) {
                console.log(error.message); //=> String
            })
            .then(stations => {

                if (stations === undefined) {
                    this.setState({error: 'API returns no data'});
                    return {};
                }

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
            onDragStart: (properties, coords, offset) => {
                console.log('drag');
                this.setState({
                    currentStation: null,
                    currentStationId: null,
                    markerCoordinates: null,
                    tides: []
                });
            },
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
                         nextEvent={this.state.nextEvent}
                         actionGetStation={this.getStation}
                         actionAddFavorite={this.addToFavorites}
                         actionRemoveFavorite={this.removeFromFavorites}
                />
            </div>
        }

        return (
            <div className="ClusterMap">
                {this.state.error && (
                    <div className='message'>{this.state.error}</div>
                )}
                <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
                    <ReactMapboxGlCluster
                        data={this.state.stations}
                        {...this.getEventHandlers()}
                    >
                    </ReactMapboxGlCluster>
                    <ZoomControl/>
                    <ScaleControl/>
                    <RotationControl/>
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