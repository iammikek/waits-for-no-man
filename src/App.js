import React, {Component} from 'react';
import {Router, browserHistory, Route, Link} from 'react-router';
import './App.css';
import ClusterMap from "./ClusterMap";

const Page = ({title}) => (
    <div className="App">
        <div className="App-header">
            <h2>{title}</h2>
        </div>
        <nav>
            <ul className="container">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/stations">Stations</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    </div>

);

const Home = (props) => (
    <Page title="Home"/>
);

const Stations = (props) => (
    <div>
        <Page title="Stations"/>
        <ClusterMap/>
    </div>
);

const About = (props) => (
    <Page title="About"/>
);

const Settings = (props) => (
    <Page title="Settings"/>
);

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/stations" component={Stations}/>
                <Route path="/settings" component={Settings}/>
            </Router>
        );
    }
}

export default App;