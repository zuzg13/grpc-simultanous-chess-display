import React from "react";
import {Header} from "../components/Header";
import CreateUser from "../components/CreateUser";
import { GameServiceClient } from "../../protos/game_grpc_web_pb";
const client = new GameServiceClient("http://localhost:8080", null, null);


export const Home = () => {
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col">
                    <CreateUser client={client}/>
                </div>
            </div>
        </div>
    );
};

// export default Home