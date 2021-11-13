import React, {useState, createContext} from "react";

export const AppContext = createContext();

export const AppContextProvider = props => {
    const [foundUsers, setFoundUsers] = useState([]);

    const addFoundUsers = (user) => {
        setFoundUsers([...foundUsers, user]);
    }

    return (
        <AppContext.Provider value={{foundUsers, setFoundUsers}}>
            {props.children}
        </AppContext.Provider>
    )
}