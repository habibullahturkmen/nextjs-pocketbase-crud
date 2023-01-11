import React from "react";
import {useRouter} from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {AuthContext} from "../context/authContext";

const Settings = () => {
    const { currentUser } = React.useContext(AuthContext);

    const router = useRouter();

    React.useEffect(() => {
        const check = async () => {
            if (!currentUser) {
                await router.push("/");
            }
        }
        check().catch(console.error);
    }, [currentUser]);

    return (
        <div>
            <Navbar />
            <h4>
                Settings
            </h4>
            <Footer />
        </div>
    );
}

export default Settings;
