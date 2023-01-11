import React from "react";
import {useRouter} from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {AuthContext} from "../context/authContext";
import Crop from "../components/Crop";
import styles from '../styles/Home.module.css'
import { backend } from "../lib/constants";

const Settings = () => {
    const { currentUser, userData, setUserData } = React.useContext(AuthContext);
    console.log(currentUser)
    const router = useRouter();

    React.useEffect(() => {
        const check = async () => {
            if (!currentUser) {
                await router.push("/");
            }
        }
        check().catch(console.error);
    }, [currentUser]);

    /*
    *
    * {
    "avatar": "blob_2Z2pi3iFCc.png",
    "collectionId": "_pb_users_auth_",
    "collectionName": "users",
    "created": "2023-01-11 17:56:02.136Z",
    "email": "test@test.com",
    "emailVisibility": false,
    "id": "dhdyh3icsnih9lp",
    "name": "test user",
    "updated": "2023-01-11 19:06:13.300Z",
    "username": "testusername",
    "verified": false,
    "expand": {}
    }
    * */


    return (
        <div>
            <Navbar />
            <div className="user-details-container">
                <div className="user-details">
                    <h3>Username: <span>{currentUser && currentUser.username}</span></h3>
                    <h3>Name: <span>{currentUser && currentUser.name}</span></h3>
                    <h3>Email: <span>{currentUser && currentUser.email}</span></h3>
                    <div>
                        <h3>Avatar: </h3>
                        {currentUser && (
                            <img
                                className="avatar"
                                src={currentUser && `${backend}/api/files/${currentUser.collectionId}/${currentUser.id}/${currentUser.avatar}`}
                                alt=""
                            />
                        )}
                    </div>
                    {/*<h3>Avatar: {currentUser && (*/}
                    {/*    <img*/}
                    {/*        className="avatar"*/}
                    {/*        src={currentUser && `${backend}/api/files/${currentUser.collectionId}/${currentUser.id}/${currentUser.avatar}`}*/}
                    {/*        alt=""*/}
                    {/*    />*/}
                    {/*)}</h3>*/}
                </div>
            </div>
            <h4 className={styles.main}>
                <Crop />
            </h4>
            <Footer />
        </div>
    );
}

export default Settings;
