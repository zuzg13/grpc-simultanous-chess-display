import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AppContextProvider } from './context/AppContex';
import Home from "./routes/Home";
import {GamesPanel} from "./routes/GamesPanel";
import {NewGamePanel} from "./routes/NewGamePanel";
import {ChessPlay} from "./routes/ChessPlay"
import queryString from "query-string";


function App() {

    var [user, setUser] = useState(null);
    window.localStorage.setItem("userId", 0);

    // const parsed = queryString.parse(location.search);
    // console.log(parsed);

    return (
        <AppContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/gamesPanel" component={GamesPanel}/>
                        <Route exact path="/newGame" component={NewGamePanel}/>
                        <Route exact path="/chessPlay" component={ChessPlay}/>
                    </Switch>
                </Router>
            </div>
        </AppContextProvider>
    );

}

export default App;