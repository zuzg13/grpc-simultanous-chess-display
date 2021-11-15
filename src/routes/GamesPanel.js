import React, { useEffect, useState } from "react";
import {getAllGames} from "../services/GamesServices"
import {deleteUser} from "../services/UserServices";
import {Games} from "../components/Games"
import {Header} from "../components/Header";
import {Navbar} from "../components/Navbar";
import {getLoggedUser} from "../services/UserServices";
import {useHistory} from "react-router-dom";

export const GamesPanel = () =>{
    const [loggedUser, setLoggedUser] = useState("");
    const [games, setGames] = useState([]);
    const [numberOfGames, setNumberOfGames] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getAllGames()
                .then(games => {
                    console.log(games)
                    setGames(games);
                });

    }, []);

    useEffect(() => {
        getLoggedUser()
            .then(userid => {
                console.log(userid)
                setLoggedUser(userid);
            });

    }, []);





    return(
        <div>
            <Header />
            <p></p>
            <h1>
                Aktywne gry
            </h1>
            <p></p>
            <Navbar user={loggedUser}/>
            <p></p>
            <Games games={games} loggeduser={loggedUser}/>
        </div>
    );

}
