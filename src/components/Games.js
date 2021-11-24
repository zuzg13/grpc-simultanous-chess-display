import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import {addUserToGame} from "../services/GamesServices";
import { Empty, Result, AddUserMessage} from "../protos/game_pb";
import { GameServiceClient } from "../protos/game_grpc_web_pb";
const client = new GameServiceClient("http://localhost:8080", null, null);

export const Games = ({games, loggeduser}) => {

    const history = useHistory();


    if (games.length === 0) return null

    const gameCreate = (e, gameid) => {
        // e.preventDefault();
        // console.log(loggeduser.userid);
        // console.log(gameid);
        // addUserToGame({gameid: gameid, userid: loggeduser.userid})
        //     .then(response => {
        //         console.log(response);
        //
        //     });
        // history.push("/");

        const addUserMessage = new AddUserMessage();
        addUserMessage.setGameid(gameid);
        addUserMessage.setUserid(loggeduser);

        client.addUserToGame(addUserMessage, null, (err, data)=>{
            if(err) console.log(err);
            else
                console.log(data.getResult()[0]);
        })

        window.location.reload();
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
        <div className="container px-4">

            <div className="container px-4"><h2>Aktywne Gry</h2></div>
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

