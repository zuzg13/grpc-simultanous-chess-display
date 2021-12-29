import React, {useEffect, useState} from "react";
import GameInfo from "../components/GameInfo";
import {useHistory, useLocation} from "react-router-dom";
import {Alert, Button, Col, Container, Nav, Navbar, NavbarBrand, Row} from "react-bootstrap";
import Chessboard from "chessboardjsx";
import queryString from "query-string";
import useStateWithCallback from 'use-state-with-callback';
import {BoardInfoRequest, EndSubGameRequest, GameId, Move, SubGameIdRequest} from "../protos/game_pb";
import {GameServiceClient} from '../protos/game_grpc_web_pb';

const client = new GameServiceClient(require('../protos/client_configuration').client_address, null, null);

const Chess = require("chess.js");

export const ChessPlay = () =>{

    const history = useHistory();

    const [loggedUser, setLoggedUser] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [isSimulUser, setisSimulUser] = useStateWithCallback(false, data => {
        if (isSimulUser) {
            setOrientation('white');
            updateInfo();
        }
    });
    const [simulUserId, setSimulUserId] = useStateWithCallback(0, id => {
        if (id > 0) {
            setisSimulUser(parseInt(loggedUser, 10) === id);

        }
    });

    const [gameReady, setGameReady] = useState(false);
    const [currentGameId, setCurrentGameId] = useState(0);
    const [subGameId, setSubGameId] = useState(0)
    const [gameId, setGameId] = useState(0);
    const [orientation, setOrientation] = useState("black");
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [winnerName, setWinnerName] = useState("");

    const [info, setInfo] = useState({});

    const [currentColor, setCurrentColor] = useStateWithCallback("white", color =>{
        console.log(color);
    });
    const [isGameOver, setIsGameOver] = useState(false);

    const [areAllGameCoursesOver, setAreAllGameCoursesOver] = useState(false);
    const [numOfBoards, setNumOfBoards] = useState(0);

    const { search } = useLocation()
    const values = queryString.parse(search);

    // initializing chess class
    const [chess] = useState(
        // Set initial state to FEN layout
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    // setting gameId and userId
    useEffect(() => {
        console.log(values);
        setGameId(values.gameid);
        setLoggedUser(window.sessionStorage.getItem("userId"));

    }, []);


    // collecting game data
    useEffect(()=>{

        const gameIdMessage = new GameId();
        gameIdMessage.setId(values.gameid);

        client.getGameCourseInfo(gameIdMessage, null, (err, data) => {
            if (err)
                console.log(err);
            else {
                setCurrentGameId(data.getCurrentgameid());
                setGameReady(data.getGameready());

                let boardsList = data?.getBoardsList() || [];
                boardsList = boardsList.map(board => board.array[2]);
                setNumOfBoards(boardsList.length);
                console.log('boards length', boardsList.length);
                setSimulUserId(boardsList[0]);
                setisSimulUser(simulUserId === parseInt(loggedUser, 10));

            }
        });
        const subGameIdRequest = new SubGameIdRequest();
        subGameIdRequest.setGameid(values.gameid);
        subGameIdRequest.setOtheruserid(window.sessionStorage.getItem("userId"));

        client.getSubGameId(subGameIdRequest, null, (err, data) => {
            if (err) console.log(err);
            else setSubGameId(data.getId());
        });
        updateInfo();

    }, [loggedUser, setSimulUserId, setisSimulUser, simulUserId, values.gameid]);

    // collecting board data
    useEffect(()=>{
        if(isGameOver === false) {
            setInterval(() => {
                const boardInfoRequest = new BoardInfoRequest();
                boardInfoRequest.setGameid(values.gameid);
                if (isSimulUser) boardInfoRequest.setSubgameid(currentGameId);
                else boardInfoRequest.setSubgameid(subGameId);
                console.log(subGameId, currentGameId);
                getCurrentBoard(boardInfoRequest);
            }, 5000);
        }
    }, [currentGameId, isGameOver, isSimulUser, subGameId, values.gameid]);



    const getCurrentBoard = (boardInfoRequest) => {
        client.getBoardInfo(boardInfoRequest, {deadline: 5000}, (err, data)=>{
            if(err) console.log(err);
            else {
                setFen(data.getBoardFen());
                chess.load(data.getBoardFen());

                updateColor(data.getCurrentcolor());
                setCurrentColor(data.getCurrentcolor());
                if(data.getGameover()) {
                    setIsGameOver(data.getGameover());
                    updateInfo();
                }
                if (data.getWinnername() !== ""){
                    setWinnerName(data.getWinnername());
                }
            }
        });
        updateInfo();
    }

    const GameAlert = () => {
        updateInfo();
        return <GameInfo info={info}/>;
    }

    const CloseButton = () => {
        if (isSimulUser === true && isGameOver === true)
            return <Button onClick={closeGame} centered >Zakończ grę</Button>;
        else
            return null;
    }

    const NextButton = (isSimul) => {
        console.log("isSimul  ", isSimul);
        if (isSimul.isSimul === true && numOfBoards > 1) {
            console.log();
            return(
            <Alert variant='info'>
                <p>Aktualna plansza: {currentGameId}</p>
                <hr />
                <Button variant='outline-info' onClick={()=>nextBoard(gameId)}>Następna plansza</Button>
            </Alert>);
        }
        else
            return null;
    }

    const nextBoard = (gameId) => {
        const gameIdMessage = new GameId();
        gameIdMessage.setId(gameId);
        client.goNext(gameIdMessage, null, (err, data)=>{
            window.location.reload();
        });

    }

    const updateInfo = ()=>{
        if(!gameReady){
            info.heading = "Oczekiwanie na pozostałych graczy";
            info.body = "Odśwież aby sprawdzić czy gra jest już w trakcie";
            info.bodyunderline = "Nie opuszczaj gry."

            setInfo(info);
        }
        else{
            if(!isGameOver){

                info.heading = "Gra w toku";
                if(orientation === 'white')
                    info.body = "Grasz białymi.";
                else
                    info.body = "Grasz czarnymi";

                if(currentColor === 'white')
                    info.bodyunderline = "Ruch białych. \n\nNie opuszczaj gry.";
                else
                    info.bodyunderline = "Ruch czarnych. \n\nNie opuszczaj gry.";

                setInfo(info);
            }else{
                info.heading = "Koniec gry";

                info.body = "Zwycięzca: ".concat(winnerName);

                if(orientation === 'white' && areAllGameCoursesOver === false)
                    info.bodyunderline = "Rozgrywka zakończona, możesz przejść do kolejnej lub opuścić grę.";
                else
                    info.bodyunderline = "Rozgrywka zakończona, możesz opuścić grę.";

                setInfo(info);
            }

        }

    };

    const handleMove = (move) => {

            if (chess.move(move) && orientation!=='white' ? chess.turn()==='w' : chess.turn()==='b') {

                const moveRequest = new Move();
                moveRequest.setGameid(values.gameid);
                if(isSimulUser) moveRequest.setSubgameid(currentGameId);
                else moveRequest.setSubgameid(subGameId);
                moveRequest.setUserid(loggedUser);
                moveRequest.setUpdatedboardfen(chess.fen());

                client.doMove(moveRequest, null, (err, data)=>{
                    if(err) console.log(err);
                });

                if(currentColor === 'white') updateColor('black');
                else updateColor('black');

                if(chess.game_over()){
                    const gameOverRequest = new EndSubGameRequest();
                    gameOverRequest.setGameid(gameId);
                    gameOverRequest.setSubgameid(subGameId);
                    gameOverRequest.setWinnerid(loggedUser);

                    client.endSubGame(gameOverRequest, {deadline: 10000}, (err, data)=>{
                        if(err) console.log(err);
                        else {
                            setIsGameOver(true);
                        }
                    });

                    const allGamesRequest = new GameId();
                    allGamesRequest.setId(gameId);
                    client.areAllGameCourseOver(allGamesRequest, (err, data)=>{
                        if(err) console.log(err);
                        else {
                            setAreAllGameCoursesOver(data.getResult());
                        }
                    });

                }

                setFen(chess.fen());
            }

        updateInfo();
    };



    const closeGame = () => {
        const gameIdRequest = new GameId();
        gameIdRequest.setId(gameId);

        client.closeGame(gameIdRequest, null, (err, data)=>{
            if(err) console.log(err);
            else{
                history.push("/");
                history.push("/gamesPanel");
            }
        });
    }

    const updateColor = (color) => {
        setCurrentColor(color);
    }


    return(
        <div>
            <Navbar bg="dark" variant = "dark" expand="lg">
                <Container>
                    <NavbarBrand>Symultana</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/../gamesPanel">Powrót do listy rozgrywek</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <p></p>
                <Row>
                    <Col sm={7}>
                            <Chessboard
                                width={600}
                                position={fen}
                                orientation={orientation}
                                draggable={gameReady || winnerName === ""}
                                onDrop={(move) =>
                                    handleMove({
                                        from: move.sourceSquare,
                                        to: move.targetSquare,
                                        promotion: "q",
                                    })
                                }
                            />
                    </Col>
                    <Col sm={5}>
                        <GameAlert />
                        <NextButton isSimul={isSimulUser}/>
                        <Row>
                            <Col sm> </Col>
                            <Col sm><CloseButton/></Col>
                            <Col sm> </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>


        </div>
    );

}
