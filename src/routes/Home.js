import React from "react";
import {Header} from "../components/Header";
import CreateUser from "../components/CreateUser";
import {Container, Col, Row} from "react-bootstrap";

import { GameServiceClient } from "../protos/game_grpc_web_pb";
const client = new GameServiceClient("http://localhost:8080", null, null);


export const Home = () => {
    return (
        <div>
            <Header />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <CreateUser client={client}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

