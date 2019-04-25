import React from 'react';
import './App.css';
import Header from "./Header/Header";
import LoginForm from "./LoginForm/LoginForm";
import { BrowserRouter as Router, Route} from "react-router-dom";
import EventTable from "./EventTable/EventTable";
import CreateEvent from "./CreateEvent/CreateEvent";

const App = () => (
    <Router>
        <div>
            <header className="App-header">
                <Header/>
                <div className="body">
                    <Route exact path="/" component={LoginForm} />
                    <Route exact path="/event" component={EventTable} />
                    <Route exact path="/create" component={CreateEvent} />
                </div>
            </header>
        </div>
    </Router>
);

export default App;
