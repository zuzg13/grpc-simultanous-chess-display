import React, { useEffect, useState } from 'react'
import {Alert, Button} from 'react-bootstrap'

export default function GameInfo ({info}){

    const RefreshButton = () =>{
        if(info.heading === "Oczekiwanie na pozostałych graczy")
            return <Button variant='outline-primary' onClick={window.location.reload}>Odśwież</Button>
        else
            return null;
    }

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