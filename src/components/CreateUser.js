import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import { User, UserId} from "../protos/game_pb";
import useStateWithCallback from 'use-state-with-callback';
import ErrorInfo from "./ErrorInfo";



const CreateUser = ({client}) => {

    const history = useHistory();

    let [user, setUser] = useState({})
    let [userid, setUserId] = useStateWithCallback(0, count => {
        if (count > 1) {
            console.log('Threshold of over 1 reached.');
            window.sessionStorage.setItem("userId", String(count));
            console.log(window.sessionStorage.getItem("userId"));
            history.push("/");
            history.push("/gamesPanel");
            window.location.reload();
        } else {
            console.log('No threshold reached.');
        }
    });
    const [errorCode, setErrorCode] = useState(0);


    function changeId(val){
        setUserId(val);
    }

    const userCreate =  () => {

        const userNew = new User();
        userNew.setId(0);
        userNew.setName(user.name);

        client.addNewUser(userNew, null, (err, data)=>{

            if(err) {
                console.log(err.message);
                setErrorCode(err.code);
            }
            else{
                userid = data.getId();
                changeId(data.getId());
            }


        });
    }

    const onChangeForm = (e) => {
        if (e.target.name === 'name') {
            user.name = e.target.value;
        }
        setUser(user)
    }

    useEffect(()=>{

        if(window.sessionStorage.getItem("userId") !== 'null' && window.sessionStorage.getItem("userId") !== null) {
            console.log(window.sessionStorage.getItem("userId"))
            history.push("/gamesPanel");
            window.location.reload();
        }
    });

    return(
        <div>
            <p></p>
            <h2>Podaj nazwę użytkownika by rozpocząć</h2>
            <form>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="exampleInputName1">Nazwa użytkownika </label>
                        <input
                            type="text"
                            onChange={onChangeForm}
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Nazwa użytkownika" />
                    </div>
                </div>
                <button type="button" onClick= {userCreate} className="btn btn-danger">Wejdź</button>
            </form>
            <p></p>
            <ErrorInfo err={errorCode}/>
         </div>
    )
}

export default CreateUser