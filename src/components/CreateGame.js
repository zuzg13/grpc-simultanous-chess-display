import React, {useEffect, useState} from 'react'
import {createGame} from "../services/GamesServices";
import { useHistory } from "react-router-dom";


const CreateGame = ({loggedUser}) => {

    const history = useHistory();

    let [user, setUser] = useState({})
    let [game, setGame] = useState({})

    const gameCreate = (e) => {
        e.preventDefault();
        onChangeForm(e);
        createGame(game)
            .then(response => {
                console.log(response);
            });
        history.push("/");
        history.push("/gamesPanel")
    }

    // const fetchAllUsers = () => {
    //     getAllUsers()
    //         .then(users => {
    //             console.log(users)
    //             setUsers(users);
    //             setNumberOfUsers(users.length)
    //         });
    // }

    // useEffect(() => {
    //     getAllUsers()
    //         .then(users => {
    //             console.log(users)
    //             // setUsers(users);
    //             // setNumberOfUsers(users.length)
    //         });
    // }, [])

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
                                        <option value="1">1</option>
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