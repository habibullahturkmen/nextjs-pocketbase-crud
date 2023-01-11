import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import useWindowDimensions from "../lib/useWindowDimensions";

export const Crop = (props) => {
    const [image, setImage] = useState(null);
    const [cropper, setCropper] = useState("");

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

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            props.setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div className="cropper-container">
            <div
                id="cropper-choose-image"
                style={{
                    width: useWindowDimensions().width > "1000" ? "400px" : "300px",
                }}
            >
                <br />
                <br />
                <div className="button-sub-container">
                    <span>
                        Choose Profile image
                        <input className={styles.settingsbutton} type="file" onChange={uploadToClient} />
                    </span>
                    {
                        !!image && (
                            <button
                                className={styles.settingsbutton}
                                onClick={getCropData}
                            >
                                Crop Image
                            </button>
                        )
                    }
                </div>
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
            <div style={{
                width: "200px",
            }}>
                { props.cropData && <Image width={100} height={100} src={props.cropData} alt="cropped" />}
            </div>
        </div>
    );
};

export default Crop;
