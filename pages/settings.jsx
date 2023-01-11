import React from "react";
import Router, {useRouter} from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {AuthContext} from "../context/authContext";
import Crop from "../components/Crop";
import styles from '../styles/Home.module.css'
import { backend } from "../lib/constants";
import pb from "../lib/pocketbase";

const Settings = () => {
    const [editSettings, setEditSettings] = React.useState(false);
    const [cropData, setCropData] = React.useState("");
    const [inputs, setInputs] = React.useState({
        name: "",
        username: "",
    });
    const { currentUser, userData, setUserData } = React.useContext(AuthContext);

    const router = useRouter();

    React.useEffect(() => {
        const check = async () => {
            if (!currentUser) {
                await router.push("/");
            }
        }
        check().catch(console.error);
    }, [currentUser]);

    const handleChange = (event) => {
        setInputs(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const uploadToServer = async (event) => {
        /**
         * Convert BASE64 to BLOB
         * @param base64Image Pass Base64 image data to convert into the BLOB
         */
        function convertBase64ToBlob(base64Image) {
            // Split into two parts
            const parts = base64Image.split(';base64,');

            // Hold the content type
            const imageType = parts[0].split(':')[1];

            // Decode Base64 string
            const decodedData = window.atob(parts[1]);

            // Create UNIT8ARRAY of size same as row data length
            const uInt8Array = new Uint8Array(decodedData.length);

            // Insert all character code into uInt8Array
            for (let i = 0; i < decodedData.length; ++i) {
                uInt8Array[i] = decodedData.charCodeAt(i);
            }

            // Return BLOB image after conversion
            return new Blob([uInt8Array], { type: imageType });
        }

        setUserData(prevState => {
            prevState.append('avatar', convertBase64ToBlob(cropData))
            prevState.append('name', inputs.name)
            prevState.append('username', inputs.username.replace(" ", ""))
        });

        await pb.collection("users").update(JSON.parse(localStorage.getItem("pocketbase_auth")).model.id, userData);
        Router.reload();
    };


    return (
        <>
            <Navbar />
            <div className="settings-container">
                <section className="user-details-container">
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
                        {
                            editSettings
                                ? (
                                    <button
                                        disabled={!cropData || !inputs.name || !inputs.username}
                                        style={{
                                            background: !cropData || !inputs.name || !inputs.username ? "#EBEBE4" : ""
                                        }}
                                        className={styles.settingsbutton}
                                        type="submit"
                                        onClick={uploadToServer}
                                    >
                                        Save Settings
                                    </button>
                                ) : (
                                    <button
                                        className={styles.settingsbutton}
                                        type="submit"
                                        onClick={() => setEditSettings(true)}
                                    >
                                        Edit Settings
                                    </button>
                                )
                        }
                    </div>
                </section>
                <section className="edit-section">
                    {
                        editSettings && (
                            <>
                                <label htmlFor="name">Change Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="New Name"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                />
                                <label htmlFor="username">Change username</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="New Username"
                                    name="username"
                                    id="username"
                                    onChange={handleChange}
                                />
                                <Crop cropData={cropData} setCropData={setCropData} />
                            </>
                        )
                    }
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Settings;
