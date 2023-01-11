import React, {createContext} from "react";
import pb from "../lib/pocketbase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [userData, setUserData] = React.useState(new FormData());

    const login = async (data) => {
        const response = await pb.collection("users").authWithPassword(data.email, data.password);
        setCurrentUser(JSON.parse(localStorage.getItem("pocketbase_auth")) && JSON.parse(localStorage.getItem("pocketbase_auth")).model)
    }

    const register = async (data) => {
        await pb.collection('users').create(data);
    }

    const logout = async () => {
        pb.authStore.clear();
        setCurrentUser(null);
    }

    React.useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("pocketbase_auth")) && JSON.parse(localStorage.getItem("pocketbase_auth")).model)
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, login, logout, register, userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    );
}
