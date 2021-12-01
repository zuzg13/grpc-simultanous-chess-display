import React, { useEffect, useState } from 'react'
import {Alert} from 'react-bootstrap'

export default function GameInfo ({info}){

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
        </Alert>
    </div>
}