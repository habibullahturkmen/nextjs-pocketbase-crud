import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import pb from "../lib/pocketbase";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {AuthContext} from "../context/authContext";
import Router from 'next/router'

export const Crop = (props) => {
    const [image, setImage] = useState(null);
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState("");

    const { currentUser, userData, setUserData } = React.useContext(AuthContext);

    const uploadToClient = async (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

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
            // prevState.append('name', "test user")
            // prevState.append('username', "testusername")
        });

        await pb.collection("users").update(JSON.parse(localStorage.getItem("pocketbase_auth")).model.id, userData);
        Router.reload();
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div>
            <div style={{ width: "100%" }}>
                <br />
                <br />
                <input className={styles.button} type="file" onChange={uploadToClient} />
                <br />
                <br />
                <Cropper
                    style={{
                        height: "250px",
                        width: "250px",
                        display: "flex"
                    }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                    guides={true}
                />
            </div>
            <div>
                <div className="box" style={{ width: "50%", float: "right" }}>
                </div>
                <div
                    className="box"
                    style={{ width: "50%", float: "right", height: "300px" }}
                >
                    <h1>
                        <span>Cropped Image</span>
                        <button className={styles.button} style={{ float: "right" }} onClick={getCropData}>
                            Crop Image
                        </button>
                    </h1>
                    { cropData && <Image width={250} height={250} src={cropData} alt="cropped" />}
                    <button
                        className={styles.button}
                        type="submit"
                        onClick={uploadToServer}
                    >
                        Send to server
                    </button>
                </div>
            </div>
            <br style={{ clear: "both" }} />
        </div>
    );
};

export default Crop;
