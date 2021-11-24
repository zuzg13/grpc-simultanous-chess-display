import React, { useEffect, useState } from "react";
import {getAllGames, getUserGames} from "../services/GamesServices"
import {Games} from "../components/Games"
import {UserGames} from "../components/UserGames"
import {Header} from "../components/Header";
import {deleteUser, getLoggedUser} from "../services/UserServices";
import {useHistory} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import NavDropdown from "react-bootstrap";
import { Empty, GameInfos, User, UserId } from "../protos/game_pb";
import { GameServiceClient} from "../protos/game_grpc_web_pb";
import useStateWithCallback from 'use-state-with-callback';

const client = new GameServiceClient("http://localhost:8080", null, null);


export const GamesPanel = () =>{
    const [loggedUser, setLoggedUser] = useState("");
    const [games, setGames] = useState([]);
    const [userGames, setUserGames] = useStateWithCallback([], count => {
        if (count.length !==0) {
            console.log('Threshold of over 1 reached.');
        } else {
            console.log('No threshold reached.');
        }
    });
    const [numberOfGames, setNumberOfGames] = useState([]);

    const history = useHistory();
    // const navigate = useNavigate();



    useEffect(() => {
        // getLoggedUser()
        //     .then(userid => {
        //         console.log(userid)
        //         setLoggedUser(userid);
        //     });
        console.log(window.sessionStorage.getItem("userId"));
        setLoggedUser(window.sessionStorage.getItem("userId"));

    }, []);

    useEffect(() => {

        client.getAllGames(new Empty(), null, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                let gamesList = response?.getGameinfosList() || [];
                gamesList = gamesList.map( game => game.array);

                for(let ind = 0; ind < gamesList.length; ind++) {
                    console.log(gamesList[ind]);
                    let tmp_array = gamesList[ind];
                    gamesList[ind] = [];
                    gamesList[ind].id = tmp_array[0];
                    gamesList[ind].owner = [];
                    gamesList[ind].owner.id = tmp_array[1][0];
                    gamesList[ind].owner.name = tmp_array[1][1];
                    gamesList[ind].capacity = tmp_array[2];
                    gamesList[ind].usersid = tmp_array[3];
                    gamesList[ind].time = tmp_array[4];
                }
                setGames(gamesList);
            }

        });

    }, []);

    const userGamesGet = () => {

        const userid = new UserId();
        userid.setId(loggedUser);

        client.getUsersGames(userid, null, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log(response);
                let gamesList = response?.getGameinfosList() || [];
                gamesList = gamesList.map(game => game.array);


                for(let ind = 0; ind < gamesList.length; ind++) {
                    console.log(gamesList[ind]);
                    let tmp_array = gamesList[ind];
                    gamesList[ind] = [];
                    gamesList[ind].id = tmp_array[0];
                    gamesList[ind].owner = [];
                    gamesList[ind].owner.id = tmp_array[1][0];
                    gamesList[ind].owner.name = tmp_array[1][1];
                    gamesList[ind].capacity = tmp_array[2];
                    gamesList[ind].usersid = tmp_array[3];
                    gamesList[ind].time = tmp_array[4];
                }
                setUserGames(gamesList);
            }

        });
    };

    const userDelete = (e) =>{
        e.preventDefault();
        console.log(loggedUser);

        const userToDelete = new UserId();
        userToDelete.setId(loggedUser);

        client.removeUser(userToDelete, null, (err, data)=>{
            if(err) console.log(err);
            else {
                setLoggedUser(null);
                window.sessionStorage.setItem("userId", null);
                console.log(window.sessionStorage.getItem("userId"));
            }
        });

        // deleteUser(loggedUser)
        //     .then(resp=>{
        //         console.log(resp);
        //     });

        history.push("/");

    }


    return(
        <div>
            <Header />
            <p>User: {loggedUser}</p>
            <Navbar bg="dark" variant = "dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={userGamesGet}>Moje gry</Nav.Link>
                            <Nav.Link href="/../newGame">Utwórz grę</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link onClick={userDelete}>Wyjdź</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/*<p>{loggedUser}</p>*/}

            <div className="row g-2">
                <div className="container"> </div>
                    <Games games={games} loggeduser={loggedUser}/>
                    <UserGames games={userGames} loggeduser={loggedUser}/>

            </div>



        </div>
    );

}
