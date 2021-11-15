import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

// import {JoinGame} from "./JoinGame";
import {addUserToGame} from "../services/GamesServices";


export const Games = ({games, loggeduser}) => {

    const history = useHistory();


    if (games.length === 0) return null

    const gameCreate = (e, gameid) => {
        e.preventDefault();
        console.log(loggeduser.userid);
        console.log(gameid);
        addUserToGame({gameid: gameid, userid: loggeduser.userid})
            .then(response => {
                console.log(response);
                history.push("/gamesPanel")
            });
        // history.push("/");

    }

    const GamesRow = (game,index) => {

        return(
            <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td>{index+1}</td>
                <td>{game.id}</td>
                <td>{game.owner.name}</td>
                <td>{game.usersid.length}/{game.capacity}</td>
                <td>
                    <button type="button"  onClick={(e)=>{gameCreate(e, game.id);}} className="btn btn-outline-primary">
                        Dołącz do gry</button>
                </td>
            </tr>
        )
    };

    const gamesTable = games.map((game,index) => GamesRow(game,index));

    return(
        <div className="container">
            <h2>Gry</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Game Id</th>
                    <th>Owner name</th>
                    <th>Liczba miejsc</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {gamesTable}
                </tbody>
            </table>
        </div>
    );
}

