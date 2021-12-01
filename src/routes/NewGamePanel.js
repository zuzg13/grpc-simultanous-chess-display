import React, { useEffect, useState } from "react";
import CreateGame from "../components/CreateGame"
import {Header} from "../components/Header";
import { GameServiceClient } from "../../protos/game_grpc_web_pb";
const client = new GameServiceClient("http://localhost:8080", null, null);


export const NewGamePanel = () =>{

    return(
        <div>
            <Header />
            <p></p>
            <CreateGame client = {client}/>
        </div>
    );

}
