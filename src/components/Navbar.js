import React, { useEffect, useState } from "react";
import {deleteUser, getLoggedUser} from "../services/UserServices";
import {useHistory} from "react-router-dom";

export const Navbar = ({user}) => {
    const [loggedUser, setLoggedUser] = useState("");
    const [games, setGames] = useState([]);

    const history = useHistory();

    const userDelete = (e) =>{
        e.preventDefault();
        console.log(user);
        deleteUser(user)
            .then(resp=>{
                console.log(resp);
            });
        history.push("/");

    }


    return(
            <div className="d-flex " style={{ float: "right" }}>
            <a href={"/../newGame"}>
                <button type="button" onClick=""  className="btn btn-primary">Utwórz grę</button>
            </a>
            <button type="button" onClick={userDelete}  className="btn btn-secondary">Wyjdź</button>
            </div>

    );

}