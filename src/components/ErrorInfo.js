import React, { useEffect, useState } from 'react'
import {Alert} from 'react-bootstrap'

const  ErrorInfo  = ({err}) => {
    try{
        if (err === 14 || err === 2) {
            return <Alert variant="danger">
                <Alert.Heading>Błąd</Alert.Heading>
                <p>
                    Błąd w połączeniu z serwerem
                </p>
            </Alert>;
        }
        else if (err === 9){
            // if(err === 'Game\'s players list is full'){
                return <Alert variant="warning">
                    <Alert.Heading>Rozgrywka nie ma wolnych miejsc</Alert.Heading>
                    <p>
                        Nie możesz do niej dołączyć.
                    </p>
                </Alert>;
            // }
        }
        else if (err === 6){
            return <Alert variant="warning">
                <Alert.Heading>W systemie zalogowany jest już użytkownik o tej nazwie</Alert.Heading>
                <p>
                    Podaj inną nazwę.
                </p>
            </Alert>;
        }
        else if (err === 3){
            return <Alert variant="warning">
                <Alert.Heading>Już jesteś dodany do tej rozgrywki</Alert.Heading>
                <p>
                    Nie możesz do niej dołączyć.
                </p>
            </Alert>;
        }
        else return null;
    }catch (e) {
        console.log(e);
        return null;
    }
}

export default ErrorInfo;