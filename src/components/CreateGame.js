import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

import { Empty, GameInfo, User } from "../protos/game_pb";
// import { GameServiceClient } from "../protos/game_grpc_web_pb";
// const client = new GameServiceClient("http://localhost:8080", null, null);


const CreateGame = ({client}) => {

    const history = useHistory();

    let [user, setUser] = useState({})
    let [loggedUser, setLoggedUser] = useState("");
    let [game, setGame] = useState({})


    useEffect(() => {
        console.log(window.sessionStorage.getItem("userId"));
        setLoggedUser(window.sessionStorage.getItem("userId"));

    }, []);

    const gameCreate = (e) => {
        e.preventDefault();
        onChangeForm(e);

        const gameInfo = new GameInfo();
        gameInfo.setId(0);
        gameInfo.setCapacity(game.capacity);
        gameInfo.setTime(game.time);

        const owner = new User();
        owner.setId(loggedUser);
        owner.setName("");

        gameInfo.setOwner(owner);
        gameInfo.setUsersidList([]);

        client.addNewGame(gameInfo, null, (err, data)=>{
            if(err) console.log(err);
            console.log(data);
        });

        history.push("/");
        history.push("/gamesPanel")
        window.location.reload();
    }


    const onChangeForm = (e) => {
        game.owner = loggedUser;
        if (e.target.name === 'numberOfPlayers') {
            game.capacity = e.target.value;
        }
        if (e.target.name === 'time') {
            game.time = e.target.value;
        }
        setGame(game);
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                    <p></p>
                    <h2>Wypełnij formularz by utworzyć nową grę, którą rozegrasz z innymi </h2>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputName1">Podaj liczby graczy razem z Tobą </label>
                                <div className="custom-select" >
                                    <select name='numberOfPlayers' onChange={onChangeForm}>
                                        <option value="0">Wybierz liczbę uczestników:</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <label htmlFor="exampleInputName2">Wybierz maksymalny czas  </label>
                                <div className="custom-select" >
                                    <select name='time' onChange={onChangeForm}>
                                        <option value="0">Wybierz czas dla graczy:</option>
                                        <option value="5">5 min</option>
                                        <option value="10">10 min</option>
                                        <option value="3">15 min</option>
                                    </select>
                                </div>
                                <p> Czas dla symultanisty będzie czasem dla graczy przemnożonym przez ich liczbę.</p>

                            </div>
                        </div>
                        <button type="button" onClick= {gameCreate} className="btn btn-danger">Utwórz</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateGame