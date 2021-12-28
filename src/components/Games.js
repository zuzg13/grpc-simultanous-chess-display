import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Result, AddUserMessage} from "../protos/game_pb";
import ErrorInfo from "./ErrorInfo";
import {Alert} from "react-bootstrap";


export const Games = ({games, loggeduser, client}) => {

    const [errorCode, setErrorCode] = useState({});


    if (games.length === 0) return <Alert variant='info'>Aktualnie nie ma żadnych utworzonych rozgrywek</Alert>;;

    const addUserToGameByGameId = (e, gameid) => {

        console.log(gameid);
        console.log(loggeduser);

        const addUserMessage = new AddUserMessage();
        addUserMessage.setGameid(gameid);
        addUserMessage.setUserid(loggeduser);

        client.addUserToGame(addUserMessage, null, (err, data)=>{
            if(err) {
                console.log(err);
                errorInfoSet(err.code);
            }
            else{
                console.log(data.getResult()[0]);
                window.location.reload();
            }

        })


    }

    const GamesRow = (game,index) => {

        return(
            <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td>{index+1}</td>
                <td>{game.id}</td>
                <td>{game.owner.name}</td>
                <td>{game.usersid.length}/{game.capacity}</td>
                <td>
                    <button type="button"  onClick={(e)=>{addUserToGameByGameId(e, game.id);}} className="btn btn-outline-primary">
                        Dołącz do gry</button>
                </td>
            </tr>
        )
    };



    const errorInfoSet = (error) =>{
        setErrorCode(error);
    }

    const gamesTable = games.map((game,index) => GamesRow(game,index));


    return(
        <div className="container px-4">

            <div className="container px-4"><h2>Aktywne Gry</h2></div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Id Gry</th>
                    <th>Właściciel</th>
                    <th>Liczba miejsc</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {gamesTable}
                </tbody>
            </table>
            <p>
                <ErrorInfo err={errorCode}/>
            </p>
        </div>
    );
}

