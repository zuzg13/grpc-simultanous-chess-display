import React, {useEffect, useState} from 'react'
import {createUser, getAllUsers} from "../services/UserServices";
import {useHistory} from "react-router-dom";


const CreateUser = ({loggedUser}) => {

    const history = useHistory();

    let [user, setUser] = useState({})

    const userCreate = (e) => {
        e.preventDefault();
        createUser(user)
            .then(response => {
                console.log(response);
            });
        history.push("/");
        history.push("/gamesPanel")
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