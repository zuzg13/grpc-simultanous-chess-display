import React, { useEffect, useState } from "react";
import {getAllGames} from "../services/GamesServices"
import {Games} from "../components/Games"
import {Header} from "../components/Header";

export const GamesPanel = () =>{
    const [loggedUser, setLoggedUser] = useState("");
    const [games, setGames] = useState([]);
    const [numberOfGames, setNumberOfGames] = useState([]);

    useEffect(() => {
        getAllGames()
                .then(games => {
                    console.log(games)
                    setGames(games);
                });
    }, []);



    const fetchAllGames = () => {
        getAllGames()
            .then(games => {
                console.log(games)
                setGames(games);
                setNumberOfGames(games.length)
            });
    }



    return(
        <div>
            <Header />
            <p></p>
            <h1>
                Aktywne gry
            </h1>
            <p></p>
            <div className="d-flex " style={{ float: "right" }}>
                <a href={"/../newGame"}><button type="button" onClick=""  className="btn btn-primary">Utwórz grę</button></a>
                <button type="button" onClick=""  className="btn btn-secondary">Wyjdź</button>
            </div>
            <p></p>
            <Games games={games}/>
        </div>
    );

}
