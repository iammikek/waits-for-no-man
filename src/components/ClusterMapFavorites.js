import React, {Component} from "react";

class ClusterMapFavorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStation: [],
            favorites: []
        }
    }

    componentDidMount() {

        let currentStation = localStorage.getItem('currentStation');
        let favorites = localStorage.getItem('favorites');

        if (currentStation !== null) {
            this.setState({currentStation: currentStation})
        }

        if (favorites !== null) {

            console.log(favorites);

            this.setState({favorites: JSON.parse(favorites)})
        }

    }

    renderFavorites() {

        console.log(this.state.favorites);

        return this.state.favorites.map(favorite => {

            return (
                <div key={favorite}>{favorite}</div>
            )
        });

    }


    render() {
        return (
            <div>
                <header>Favorites List</header>
                <section>Current Station: {this.state.currentStation}</section>

                <section className="favoritesList">

                    {this.renderFavorites()}


                </section>


            </div>
        )

    }

}

export default ClusterMapFavorites;

