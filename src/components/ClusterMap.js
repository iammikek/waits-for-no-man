import React, {Component} from "react";
import ReactMapboxGl, {ZoomControl, ScaleControl, Marker, Popup} from "react-mapbox-gl";
import {ReactMapboxGlCluster} from "react-mapbox-gl-cluster";
import Station from "./Station";
import "../css/ClusterMap.css";

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
            favorites: [],
            tides: [],
            tideEvents: [],
            api: 'https://api.brightstormhosts.co.uk/api/V1'
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

        fetch(this.state.api + '/stations/' + this.state.currentStationId + '/events/4', {
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

    getEventHandlers() {
        return {
            onClick: (properties, coords, offset) => {

                this.setState({markerCoordinates: coords});

                this.setCurrentStation(properties);
                this.getTideEvents();
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
                         tides={this.state.tides}
                />
            </div>
        }


        console.log(this.state.stations);

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