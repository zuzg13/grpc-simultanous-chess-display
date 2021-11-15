import React, { useEffect, useState } from "react";
import {getAllGames} from "../services/GamesServices"
// import {Games} from "../components/Games"

import CreateGame from "../components/CreateGame"
import {Header} from "../components/Header";
import {getLoggedUser} from "../services/UserServices";

export const NewGamePanel = () =>{
    const [loggedUser, setLoggedUser] = useState("");
    const [games, setGames] = useState([]);
    // const [numberOfGames, setNumberOfGames] = useState([]);

    // useEffect(() => {
    //     getAllGames()
    //         .then(games => {
    //             console.log(games)
    //             setGames(games);
    //         });
    // }, []);

    useEffect(() => {
        getLoggedUser()
            .then(userid => {
                console.log(userid)
                setLoggedUser(userid);
            });
    }, []);

    // const fetchAllGames = () => {
    //     getAllGames()
    //         .then(games => {
    //             console.log(games)
    //             setGames(games);
    //             setNumberOfGames(games.length)
    //         });
    // }



    return(
        <div>
            <Header />
            <p></p>
            <CreateGame loggedUser={loggedUser}/>
        </div>
    );

}
