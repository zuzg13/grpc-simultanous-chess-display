import React, { useEffect, useState } from "react";
import {Games} from "../components/Games"
import {UserGames} from "../components/UserGames"
import {Header} from "../components/Header";
import {useHistory} from "react-router-dom";
import {Container, Col, Nav, Navbar, NavbarBrand, Row} from "react-bootstrap";
import { Empty, GameInfos, User, UserId } from "../protos/game_pb";
import { GameServiceClient} from "../protos/game_grpc_web_pb";
import useStateWithCallback from 'use-state-with-callback';
import ErrorInfo from "../components/ErrorInfo";

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
    const [errorCode, setErrorCode] = useState({});

    const history = useHistory();



    useEffect(() => {
        if(window.sessionStorage.getItem("userId") === 'null' || window.sessionStorage.getItem("userId") === null){
            setLoggedUser('null');
            history.push('/');
        }
        else
            setLoggedUser(window.sessionStorage.getItem("userId"));

    }, []);

    useEffect(() => {
        getGames();
    }, []);

    useEffect(()=>{
        userGamesGet();
    }, [loggedUser])


    const parseGameInfos = (gamesInfos) => {
        let gamesList = gamesInfos.map(game => game.array);

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

        return gamesList;
    }

    const getGames = () => {
        client.getAllGames(new Empty(), null, (err, response) => {
            if (err) {
                console.log(err);
                errorInfoSet(err.code);
            } else {
                let gamesList = response?.getGameinfosList() || [];
                setGames(parseGameInfos(gamesList));
            }

        });
    }

    const userGamesGet = () => {

        if(loggedUser !== 'null'){
            const userid = new UserId();
            userid.setId(loggedUser);

            client.getUsersGames(userid, null, (err, response) => {
                if (err) {
                    console.log(err);
                    errorInfoSet(err.code);

                } else {

                    let gamesList = response?.getGameinfosList() || [];
                    setUserGames(parseGameInfos(gamesList));
                }

            });
        }



    };

    const errorInfoSet = (error) =>{
        setErrorCode(error);
    }

    const userDelete = (e) =>{
        e.preventDefault();
        console.log(loggedUser);

        const userToDelete = new UserId();
        userToDelete.setId(loggedUser);

        client.removeUser(userToDelete, null, (err, data)=>{
            if(err) {
                console.log(err);
                setErrorCode(err.code);
            }
            else {
                setLoggedUser(null);
                window.sessionStorage.setItem("userId", null);
                console.log(window.sessionStorage.getItem("userId"));
                history.push("/");
            }
        });
    }


    return(
        <div>
            <Header />
            <Navbar bg="dark" variant = "dark" expand="lg">
                <Container>
                    <NavbarBrand>Symultana</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={userGamesGet}>Moje gry</Nav.Link>
                            <Nav.Link onClick={()=>{getGames();userGamesGet();}}>Odśwież listę rozgrywek</Nav.Link>
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
            <Container>
                <p></p>
                <Row>
                    <Col>
                        <Games games={games} loggeduser={loggedUser} client={client}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UserGames games={userGames} loggeduser={loggedUser} client={client}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ErrorInfo err={errorCode}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}
