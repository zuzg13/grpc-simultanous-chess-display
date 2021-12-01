import React, { useEffect, useState } from "react";
import {Header} from "../components/Header";
import GameInfo from "../components/GameInfo";
import {useLocation} from "react-router-dom";
import {Container, Col, Row, Button, Alert, Navbar, Nav, Modal, ModalBody} from "react-bootstrap";
import Chessboard from "chessboardjsx";
import queryString from "query-string";
import useStateWithCallback from 'use-state-with-callback';
import { GameId, BoardInfoRequest, SubGameIdRequest, SubGameId, Move, EndSubGameRequest} from "../protos/game_pb";
import { GameServiceClient } from "../protos/game_grpc_web_pb";
const client = new GameServiceClient("http://localhost:8080", null, null);
const Chess = require("chess.js");

export const ChessPlay = () =>{

    const [loggedUser, setLoggedUser] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [isSimulUser, setisSimulUser] = useStateWithCallback(false, count => {
        if (isSimulUser) {
            console.log('isSimulUser set to', count);
            setOrientation('white');
        } else {
            console.log('isSimulUser set to', count);
        }
    });
    const [simulUserId, setSimulUserId] = useStateWithCallback(0, count => {
        if (count > 0) {
            console.log('simulUserId set to', count);
            setisSimulUser(parseInt(loggedUser, 10) === count);

        } else {
            console.log('simulUserId set to', count);
        }
    });

    const [gameReady, setGameReady] = useStateWithCallback(false, count => {
        if (count > 1) {
            console.log('gameReady set to', count);

        } else {
            console.log('gameReady set to', count);

        }
    });
    const [currentGameId, setCurrentGameId] = useStateWithCallback(0, count => {
        if (count > 0) {
            console.log('currentGameId set to', count);
            // setSubGameId(count);

        } else {
            console.log('currentGameId set to', count);
        }
    });
    const [subGameId, setSubGameId] = useStateWithCallback(0, count => {
        if (count > 0) {
            console.log('Subgameid of over 0 reached.');
            }

    });
    const [gameId, setGameId] = useStateWithCallback(0, id=>{
        if (id > 0) {
            console.log('gameId set to', id);

        } else {
            console.log('gameId set to', id);
        }
    });
    const [orientation, setOrientation] = useStateWithCallback("black", color=>{});
    const [fen, setFen] = useStateWithCallback("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            new_fen=> {
        if(new_fen === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
            console.log('did not changed');
        }
        else{
            console.log('changed');
        }
    });

    const [winnerName, setWinnerName] = useState("");

    const [info, setInfo] = useStateWithCallback({}, info => {console.log(info)});
    const [moveDone, setMoveDone] = useState(false);

    const [currentColor, setCurrentColor] = useStateWithCallback("white", color =>{
        //
    });
    const [isGameOver, setIsGameOver] = useState(false);

    const [areAllGameCoursesOver, setAreAllGameCoursesOver] = useStateWithCallback(false, value =>{
        if(value){
            console.log('areAllGameCoursesOver set to true')

        }
    });
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

        client.getGameCourseInfo(gameIdMessage, null, (err, data)=>{
            if(err)
                console.log(err);
            else{
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

        client.getSubGameId(subGameIdRequest, null, (err, data)=>{
            if(err) console.log(err);
            else setSubGameId(data.getId());
        });


    }, []);

    // useEffect(()=>{
    //
    //     // if(!isSimulUser){
    //     //
    //     //     const subGameIdRequest = new SubGameIdRequest();
    //     //     subGameIdRequest.setGameid(values.gameid);
    //     //     subGameIdRequest.setOtheruserid(window.sessionStorage.getItem("userId"));
    //     //
    //     //     client.getSubGameId(subGameIdRequest, null, (err, data)=>{
    //     //         if(err) console.log(err);
    //     //         else setSubGameId(data.getId());
    //     //     });
    //     //
    //     // }
    //
    // }, []);

    useEffect(()=>{
        if(!isGameOver){
            const boardInfoRequest = new BoardInfoRequest();
            boardInfoRequest.setGameid(values.gameid);
            if(isSimulUser) boardInfoRequest.setSubgameid(currentGameId);
            else boardInfoRequest.setSubgameid(subGameId);
            console.log(subGameId, currentGameId);
            getCurrentBoard(boardInfoRequest);
        }

    }, []);

    useEffect(()=>{
        setInterval(()=>{
            if(winnerName === ""){
                const boardInfoRequest = new BoardInfoRequest();
                boardInfoRequest.setGameid(values.gameid);
                if(isSimulUser) boardInfoRequest.setSubgameid(currentGameId);
                else boardInfoRequest.setSubgameid(subGameId);
                console.log(subGameId, currentGameId);
                getCurrentBoard(boardInfoRequest);
            }
        },5000);
    });


    useEffect(()=>{
        updateInfo();
    }, [isGameOver]);

    useEffect(()=>{
        updateInfo();
    }, [currentColor]);

    useEffect(()=>{
        updateInfo();
    }, [gameReady]);

    const getCurrentBoard = (boardInfoRequest) => {
        client.getBoardInfo(boardInfoRequest, {deadline: 5000}, (err, data)=>{
            if(err) console.log(err);
            else {
                setFen(data.getBoardFen());
                chess.load(data.getBoardFen());

                updateColor(data.getCurrentcolor());
                if(data.getGameover()) {
                    setIsGameOver(data.getGameover());
                    // window.localStorage.setItem('isGameOver', 'true');
                    setModalShow(true);
                }
                if (data.getWinnername() !== ""){
                    setWinnerName(data.getWinnername());
                }
            }
        });
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
            setMoveDone(false);
        });

    }


    // preparing and updating game info
    const updateInfo = ()=>{
        if(!gameReady){
            info.heading = "Oczekiwanie na pozostałych graczy";
            info.body = "Zostaniesz poinformowany, gdy gra będzie gotowa";
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
                if(orientation === 'white')
                    info.body = "Grasz białymi.";
                else
                    info.body = "Grasz czarnymi";

                if(currentColor !== 'white')
                    info.bodyunderline = "Rozgrywka zakończona, możesz przejść do kolejnej lub opuścić grę.";
                else
                    info.bodyunderline = "Rozgrywka zakończona, możesz opuścić grę.";

                setInfo(info);
            }

        }
        if(areAllGameCoursesOver){
            info.heading = "Gra zakończona";
            info.body = "Wszystkie rozgrywki się zakończyły";
            info.bodyunderline = "Możesz wrócić do strony głównej"

            setInfo(info);
        }

        console.log(info);

    };

    const handleMove = (move) => {

        if(!(isSimulUser && moveDone)){
            if (chess.move(move)) {

                const moveRequest = new Move();
                moveRequest.setGameid(values.gameid);
                if(isSimulUser) moveRequest.setSubgameid(currentGameId);
                else moveRequest.setSubgameid(subGameId);
                moveRequest.setUserid(loggedUser);
                moveRequest.setUpdatedboardfen(chess.fen());

                client.doMove(moveRequest, null, (err, data)=>{
                    if(err) console.log(err);
                    else if(isSimulUser){
                        setMoveDone(true);
                    }
                });

                // if (currentColor === 'white') setCurrentColor('black');
                // else setCurrentColor('white');
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

                // Sets state of chess board
                setFen(chess.fen());
            }
        }
        updateInfo();
    };

    const MyVerticallyCenteredModal = (props) => {
        if(isSimulUser === true && numOfBoards > 1){
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Koniec rozgrywki
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Zwycięzca: {winnerName}
                        </p>
                        <p>
                            Możesz przejść do kolejnej planszy lub wrócić do menu głównego.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>nextBoard(gameId)}>Przejście do kolejnej planszy</Button>
                        <Button href='../gamesPanel'>Powrót do menu głównego</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else{
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Koniec gry
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Zwycięzca: {winnerName}
                        </p>
                        <p>
                            Możesz powrócić do menu głównego.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href='../gamesPanel'>Powrót do menu głównego</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

    const closeGame = () => {
        const gameId = new GameId();
        gameId.setId(gameId);

        client.closeGame(gameId, {deadline: 5000}, (err, data)=>{
            if(err) console.log(err);
        });
    }

    const updateColor = (color) => {
        setCurrentColor(color);
    }


    return(
        <div>
            <Header />
            <Navbar bg="dark" variant = "dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/../gamesPanel">Powrót do listy rozgrywek</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Nav.Link onClick={updateInfo}>up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <p></p>
                <Row>
                    <Col sm={8}>
                        <div className="board-container">
                            <Chessboard
                                width={600}
                                position={fen}
                                orientation={orientation}
                                draggable={gameReady}
                                onDrop={(move) =>
                                    handleMove({
                                        from: move.sourceSquare,
                                        to: move.targetSquare,
                                        promotion: "q",
                                    })
                                }
                            />
                    </div>
                    </Col>
                    <Col sm={4}>
                        <GameInfo info={info}/>

                        <NextButton isSimul={isSimulUser}/>
                        <p>
                            isSimulUser = {isSimulUser}
                        </p>
                        <p>
                            gameId = {gameId}
                        </p>
                        <p>
                            subGameId = {subGameId}
                        </p>
                        <p>
                            currentGameId = {currentGameId}
                        </p>
                        <p>
                            currentcolor = {currentColor}
                        </p>
                        <p>
                            orientation = {orientation}
                        </p>
                        <p>
                            isGameover = {isGameOver}
                        </p>
                        <p>
                            userid = {loggedUser}
                        </p>
                        <p>
                            currentFen = {fen}
                        </p>
                        <p>
                            winnerName = {winnerName}
                        </p>
                    </Col>
                </Row>
            </Container>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );

}
