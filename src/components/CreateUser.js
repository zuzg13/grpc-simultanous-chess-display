import React, {useEffect, useState} from 'react'
import {createUser, getAllUsers} from "../services/UserServices";
import {useHistory} from "react-router-dom";
import { Empty, User, UserId} from "../protos/game_pb";
import { GameServiceClient } from "../protos/game_grpc_web_pb";
import useStateWithCallback from 'use-state-with-callback';

const client = new GameServiceClient("http://localhost:8080", null, null);


const CreateUser = ({loggedUser}) => {

    const history = useHistory();
    // const navigate = useNavigate();

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


    // useEffect(()=>{
    //     user.id = 0;
    //     setUser(user);
    //
    //     let id = 0;
    //     setUserId(id);
    // }, []);

    function changeId(val){
        setUserId(val);
    }

    const userCreate = async () => {
        // createUser(user)
        //     .then(response => {
        //         // setUser(response);
        //         // sessionStorage.setItem("userId", response);
        //         console.log(response);
        //     });
        const userNew = new User();
        userNew.setId(0);
        userNew.setName(user.name);

        await client.addNewUser(userNew, null, (err, data)=>{
            // console.log(data.getId());
            userid = data.getId();
            // setUserId(userid+1);
            changeId(data.getId());
        });



        // history.push("/");
        // history.push("/gamesPanel");

    }


    const onChangeForm = (e) => {
        if (e.target.name === 'name') {
            user.name = e.target.value;
        }
        setUser(user)
    }



    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                    <p></p>
                    <h2>Podaj swoje imię by rozpocząć</h2>
                    <form>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputName1">Imię: </label>
                                <input
                                    type="text"
                                    onChange={onChangeForm}
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Your name" />
                            </div>
                        </div>
                        <button type="button" onClick= {userCreate} className="btn btn-danger">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser