import React, {Component} from 'react';
import {Router, browserHistory, Route, Link} from 'react-router';
import '../css/App.css';
import ClusterMap from "./ClusterMap";
import ClusterMapFavorites from "./ClusterMapFavorites";

const Page = ({title}) => (
    <div className="App">
        <div className="App-header">
            <h2>{title}</h2>
        </div>
    </div>

);


/*
 <nav>
            <ul className="container">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/stations">Stations</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
 */


const Home = (props) => (
    <Page title="Home"/>
);

const Stations = (props) => (
    <div>
        <Page title="Waits for No Man"/>
        <ClusterMap/>
        <footer>
            an <a href="https://automica.io">automica.io</a> project
        </footer>
    </div>

);

const About = (props) => (
    <Page title="About"/>
);

const Settings = (props) => (
    <Page title="Settings"/>
);

const Favorites = (props) => (
    <div>
    <Page title="Favorites"/>
        <ClusterMapFavorites/>
    </div>
        );



class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Stations}/>
                <Route path="/about" component={About}/>
                <Route path="/stations" component={Stations}/>
                <Route path="/favorites" component={Favorites}/>
            </Router>
        );
    }
}

export default App;