import React from "react";
import Link from "next/link";

import Logo from "../public/vercel.svg";
import {AuthContext} from "../context/authContext";
import Image from "next/image";

const Navbar = () => {

    const { currentUser, logout } = React.useContext(AuthContext);

    console.log("nav currentUser", currentUser)
    return (
        <div className="nav-container">
            <div className="nav-logo-container">
                <Link className="nav-links" href="/">
                    <Image priority className="logo-img" src={Logo} alt="Logo"/>
                </Link>
            </div>
            <div className="home-signup-login-container">
                <div>
                    <Link className="nav-links" href="/"><h3>Home</h3></Link>
                </div>
                <div>
                    {
                        currentUser
                            ? (
                                <Link className="nav-links other-links" href="/dashboard"><h3>Dashboard</h3></Link>
                            ) : (
                                <Link className="nav-links other-links" href="/register"><h3>Sign Up</h3></Link>
                            )
                    }
                </div>
                <div className="hr-div">
                    <hr/>
                </div>
                <div>
                    {
                        currentUser
                            ? (
                                <Link className="nav-links other-links" href="/"><h3 onClick={logout}>Logout</h3></Link>
                            ) : (
                                <Link className="nav-links other-links" href="/login"><h3>Login</h3></Link>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;
