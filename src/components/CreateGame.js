import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import {Container, Row, Form, Button, Col} from 'react-bootstrap'
import { Empty, GameInfo, User } from "../protos/game_pb";
import ErrorInfo from "./ErrorInfo";


const CreateGame = ({client}) => {

    const history = useHistory();

    let [errorCode, setErrorCode] = useState(0)
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

        const owner = new User();
        owner.setId(loggedUser);
        owner.setName("");

        gameInfo.setOwner(owner);
        gameInfo.setUsersidList([]);

        client.addNewGame(gameInfo, null, (err, data)=>{
            if(err) {
                console.log(err);
                setErrorCode(err.code);
            }
            else {
                console.log(data);
                history.push("/");
                history.push("/gamesPanel")
                window.location.reload();
            }

        });


    }


    const onChangeForm = (e) => {
        game.owner = loggedUser;
        if (e.target.name === 'numberOfPlayers') {
            game.capacity = e.target.value;
        }
        setGame(game);
    }


    return(
        <div>
            <Container>
                <p></p>
                <h2>Wypełnij formularz by utworzyć nową grę, którą rozegrasz z innymi </h2>
                <p></p>
                <Form>
                    <Form.Label htmlFor="exampleInputName1">Podaj liczby graczy razem z Tobą </Form.Label> <p></p>

                    <select class="form-select" name='numberOfPlayers' onChange={onChangeForm}>
                        <option value="0">Wybierz liczbę uczestników:</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br/>
                    <p></p>
                    <Button type="submit" onClick= {gameCreate} className="btn btn-danger">Utwórz</Button>
                </Form>
                <Row>
                    <Col>
                        <ErrorInfo err={errorCode}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateGame



// <div className="container">
//     <div className="row">
//         <div className="col-md-7 mrgnbtm">
//             <p></p>
//             <h2>Wypełnij formularz by utworzyć nową grę, którą rozegrasz z innymi </h2>
//             <form>
//                 <div className="row">
//                     <div className="form-group col-md-12">
//                         <p><label htmlFor="exampleInputName1">Podaj liczby graczy razem z Tobą </label></p>
//                         {/*<div className="custom-select" >*/}
//                             <select name='numberOfPlayers' onChange={onChangeForm}>
//                                 <option value="0">Wybierz liczbę uczestników:</option>
//                                 <option value="2">2</option>
//                                 <option value="3">3</option>
//                                 <option value="4">4</option>
//                                 <option value="5">5</option>
//                             </select>
//                         {/*</div>*/}
//                     </div>
//                 </div>
//                 <button type="button" onClick= {gameCreate} className="btn btn-danger">Utwórz</button>
//             </form>
//         </div>
//     </div>
// </div>