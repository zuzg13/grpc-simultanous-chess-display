import React, { useEffect, useState } from "react";
import {Header} from "../components/Header";
import GameInfo from "../components/GameInfo";
import {useHistory, useLocation} from "react-router-dom";
import {Container, Col, Row} from "react-bootstrap";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import queryString from "query-string";
import useStateWithCallback from 'use-state-with-callback';
import { GameId, BoardInfoRequest, SubGameIdRequest, SubGameId, Move} from "../protos/game_pb";
import { GameServiceClient } from "../protos/game_grpc_web_pb";
import {skipUntil} from "rxjs/operators";
const client = new GameServiceClient("http://localhost:8080", null, null);

const Chess = require("chess.js");

export const ChessPlay = () =>{
    const [loggedUser, setLoggedUser] = useState("");
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

    const [gameReady, setGameReady] = useStateWithCallback(null, count => {
        if (count > 1) {
            console.log('gameReady set to', count);
        } else {
            console.log('gameReady set to', count);
        }
    });
    const [currentGameId, setCurrentGameId] = useStateWithCallback(0, count => {
        if (count > 0) {
            console.log('currentGameId set to', count);

        } else {
            console.log('currentGameId set to', count);
        }
    });
    const [subGameId, setSubGameId] = useStateWithCallback(0, count => {
        if (count > 0) {
            console.log('Subgameid of over 0 reached.');
            if(!isSimulUser){

                const boardInfoRequest = new BoardInfoRequest();
                boardInfoRequest.setGameid(gameId);
                boardInfoRequest.setSubgameid(subGameId);
                setOrientation('black');


                client.getBoardInfo(boardInfoRequest, null, (err, data)=>{
                    if(err) console.log(err);
                    else {
                        console.log(data.getBoardFen());
                        setFen(data.getBoardFen());
                        chess.load(data.getBoardFen());
                    }
                });
            }
        } else {
            console.log('No Subgameid reached.');
        }
    });
    const [gameId, setGameId] = useStateWithCallback(0, id=>{
        if (id > 0) {
            console.log('gameId set to', id);

        } else {
            console.log('gameId set to', id);
        }
    });
    const [orientation, setOrientation] = useStateWithCallback("black", color=>{
        if(color !== 'white'){
            console.log('still black');
        }
        else{
            console.log('its white');
            const boardInfoRequest = new BoardInfoRequest();
            boardInfoRequest.setGameid(values.gameid);
            boardInfoRequest.setSubgameid(currentGameId);


            client.getBoardInfo(boardInfoRequest, null, (err, data)=>{
                if(err) console.log(err);
                else {
                    console.log(data.getBoardFen());
                    setFen(data.getBoardFen());
                    chess.load(data.getBoardFen());
                }
            });
        }

    });
    const [fen, setFen] = useStateWithCallback("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            new_fen=> {
        if(new_fen === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
            console.log('did not changed');
        }
        else{
            console.log('changed');
        }
    });
    const [info, setInfo] = useState({});


    const history = useHistory();

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

    useEffect(() => {
        setInterval(()=>{
            const boardInfoRequest = new BoardInfoRequest();
            boardInfoRequest.setGameid(values.gameid);
            if(isSimulUser) boardInfoRequest.setSubgameid(currentGameId);
            else boardInfoRequest.setSubgameid(subGameId);


            client.getBoardInfo(boardInfoRequest, null, (err, data)=>{
                if(err) console.log(err);
                else {
                    console.log(data.getBoardFen());
                    setFen(data.getBoardFen());
                    chess.load(data.getBoardFen());
                }
            });
        },5000);
    })


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
                setSimulUserId(boardsList[0]);
                setisSimulUser(simulUserId === parseInt(loggedUser, 10));

                // for(let ind = 0; ind < boardsList.length; ind++) {
                //     console.log(boardsList[ind]);
                //     let tmp_array = boardsList[ind];
                //     boardsList[ind] = [];
                //     boardsList[ind].gameId = tmp_array[0];
                //     boardsList[ind].subGameId = tmp_array[1];
                //     boardsList[ind].simulUserId = tmp_array[2];
                //     boardsList[ind].otherUserId = tmp_array[3];
                //     boardsList[ind].board_FEN = tmp_array[4];
                // }
            }
        });

    }, []);

    useEffect(()=>{

        if(!isSimulUser){

            const subGameIdRequest = new SubGameIdRequest();
            subGameIdRequest.setGameid(values.gameid);
            subGameIdRequest.setOtheruserid(window.sessionStorage.getItem("userId"));

            client.getSubGameId(subGameIdRequest, null, (err, data)=>{
                if(err) console.log(err);
                else setSubGameId(data.getId());
            });
            //
            //     const boardInfoRequest = new BoardInfoRequest();
            //     boardInfoRequest.setGameid(gameId);
            //     boardInfoRequest.setSubgameid(subGameId);
            //     setOrientation('black');
            //
            //     client.getBoardInfo(boardInfoRequest, null, (err, data)=>{
            //         if(err) console.log(err);
            //         else setFen(data.getBoardFen());
            //     });
        }

    }, []);

    // useEffect(()=>{
    //
    //     if(isSimulUser){
    //
    //     }
    // }, []);

    // preparing info
    useEffect(()=>{
        if(!gameReady){
            info.heading = "Oczekiwanie na pozostałych graczy";
            info.body = "Zostaniesz poinformowany, gdy gra będzie gotowa";
            info.bodyunderline = "Nie opuszczaj gry."

            setInfo(info);
        }
        if(gameReady){
            info.heading = "Gra w toku";
            if(orientation === 'white')
                info.body = "Grasz białymi";
            else
                info.body = "Grasz czarnymi";
            info.bodyunderline = "Nie opuszczaj gry."

            setInfo(info);
        }

    }, []);

    const handleMove = (move) => {

        if (chess.move(move)) {

            /// TODO: sending move info, moving to next game over

            const moveRequest = new Move();
            moveRequest.setGameid(values.gameid);
            if(isSimulUser) moveRequest.setSubgameid(currentGameId);
            else moveRequest.setSubgameid(subGameId);
            moveRequest.setUserid(loggedUser);
            moveRequest.setUpdatedboardfen(chess.fen());

            client.doMove(moveRequest, null, (err, data)=>{
                if(err) console.log(err);
            });


            if(isSimulUser){
                const gameIdMessage = new GameId();
                gameIdMessage.setId(values.gameid);
                client.goNext(gameIdMessage, null, (err, data)=>{
                    if(err) console.log(err);
                })
            }

            // setTimeout(() => {
            //     // const moves = chess.moves();
            //     // if (moves.length > 0) {
            //     //     const computerMove = moves[Math.floor(Math.random() * moves.length)];
            //     //     chess.move(computerMove);
            //     //     setFen(chess.fen());
            //     // }
            // }, 300);

            // Sets state of chess board
            setFen(chess.fen());
        }
    };


    return(
        <div>
            <Header />
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
                                // onDrop prop tracks everytime a piece is moved.
                                // The rest is handled in the the handleMove function.
                                onDrop={(move) =>
                                    handleMove({
                                        from: move.sourceSquare,
                                        to: move.targetSquare,
                                        // This promotion attribute changes pawns to a queen if they reach the other side of the board.
                                        promotion: "q",
                                    })
                                }
                            />
                    </div>
                    </Col>
                    <Col sm={4}>
                        <GameInfo info={info}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}
