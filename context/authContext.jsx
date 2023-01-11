import React, {createContext} from "react";
import axios from "axios";
import pb from "../lib/pocketbase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null);

    const login = async (data) => {
        const response = await pb.collection("users").authWithPassword(data.email, data.password);
        setCurrentUser(response.record);
    }

    const logout = async () => {
        pb.authStore.clear();
        setCurrentUser(null);
    }

    React.useEffect(() => {
        // localStorage.setItem("user", JSON.stringify((currentUser)));
        setCurrentUser(JSON.parse(localStorage.getItem("pocketbase_auth")) && JSON.parse(localStorage.getItem("pocketbase_auth")).model)
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
