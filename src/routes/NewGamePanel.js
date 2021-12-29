import React from "react";
import CreateGame from "../components/CreateGame"
import {Header} from "../components/Header";
import {GameServiceClient} from "../protos/game_grpc_web_pb";
import {Col, Container, Row} from "react-bootstrap";

const client = new GameServiceClient(require('../protos/client_configuration').client_address, null, null);


export const NewGamePanel = () =>{

    return(
        <div>
            <Header />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <CreateGame client = {client}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}
