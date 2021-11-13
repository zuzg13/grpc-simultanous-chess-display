import React from "react";
import {Header} from "../components/Header";
// import NoAccount from "../components/NoAccount";
import CreateUser from "../components/CreateUser";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col">
                    <CreateUser/>
                </div>
            </div>
        </div>
    );
};

export default Home