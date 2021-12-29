import React from "react";
import {Header} from "../components/Header";
import CreateUser from "../components/CreateUser";
import {Col, Container, Row} from "react-bootstrap";

import {GameServiceClient} from "../protos/game_grpc_web_pb";

const client = new GameServiceClient(require('../protos/client_configuration').client_address, null, null);


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

