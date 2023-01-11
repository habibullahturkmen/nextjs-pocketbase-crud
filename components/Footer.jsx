import React from "react";
import Link from "next/link";

import Logo from "../public/vercel.svg";
import Image from "next/image";

const Footer = () => {

    return (
        <div className="nav-container">
            <div className="nav-logo-container">
                <Link className="nav-links" href="/">
                    <Image priority className="footer-logo-img" src={Logo} alt="Logo"/>
                </Link>
            </div>
            <div className="home-signup-login-container">
                    <span>Made with ❤️, <strong>Next.js</strong> and <strong>Pocketbase</strong>.</span>
            </div>
        </div>
    );
}

export default Footer;
