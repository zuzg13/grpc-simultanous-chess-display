import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { Empty, UserChange} from "../protos/game_pb";
import {Alert} from "react-bootstrap";


export const UserGames = ({games, loggeduser, client}) => {

    const history = useHistory();

    if (games.length === 0) return <Alert variant='info'> Nie jesteś dodany do żadnych rozgrywek.</Alert>;

    const joinGame = (e, gameid) => {
        const userChange = new UserChange();
        userChange.setGameid(gameid);
        userChange.setUserid(loggeduser);

        client.startGame(userChange, null, (err, data)=>{});

        history.push("/chessPlay?gameid=".concat(gameid.toString()));
    }


    const GamesRow = (game,index) => {

        return(
            <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td>{index+1}</td>
                <td>{game.id}</td>
                <td>{game.owner.name}</td>
                <td>{game.usersid.length}/{game.capacity}</td>
                <td>
                    <button type="button"  onClick={(e)=>{joinGame(e, game.id);}} className="btn btn-outline-primary">
                        Wejdź do gry</button>
                </td>
            </tr>
        )
    };

    const gamesTable = games.map((game,index) => GamesRow(game,index));

    return(
        <div className="container px-4">
            <div className="container px-4"><h2>Gry użytkownika</h2></div>
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

