import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Home} from "./routes/Home";
import {GamesPanel} from "./routes/GamesPanel";
import {NewGamePanel} from "./routes/NewGamePanel";
import {ChessPlay} from "./routes/ChessPlay"

function App() {


    return (
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
    );

}

export default App;