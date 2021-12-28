import React from 'react'
import {Alert, Button} from 'react-bootstrap'

export default function GameInfo ({info}){

    function refreshPage() {
        window.location.reload(false);
    }

    const RefreshButton = () =>{
        if(info.heading === "Oczekiwanie na pozostałych graczy")
            return <Button variant='outline-primary' onClick={refreshPage}>Odśwież</Button>
        else
            return null;
    }

    if(info.heading === "Koniec gry")
        return <div>
            <Alert variant="secondary">
                <Alert.Heading>{info.heading}</Alert.Heading>
                <p>
                    {info.body}
                </p>
                <hr />
                <p className="mb-0">
                    {info.bodyunderline}
                </p>
                <RefreshButton/>
            </Alert>
        </div>
    else
        return <div>
            <Alert variant="primary">
                <Alert.Heading>{info.heading}</Alert.Heading>
                <p>
                    {info.body}
                </p>
                <hr />
                <p className="mb-0">
                    {info.bodyunderline}
                </p>
                <RefreshButton/>
            </Alert>
        </div>
}