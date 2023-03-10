import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pb from "../lib/pocketbase";
import {AuthContext} from "../context/authContext";

const Register = () => {

    const [inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [error, setError] = React.useState(null);

    const router = useRouter();

    const { currentUser, register } = React.useContext(AuthContext);

    React.useEffect(() => {
        const check = async () => {
            if (currentUser) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(inputs);
            await router.push("/login");
        } catch (err) {
            console.log(err)
            setError("invalid info, check and try again");
        }
    }

    return (
        <>
            <Navbar />
            <div className="auth">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        placeholder="confirm password"
                        name="passwordConfirm"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                    >
                        Register
                    </button>
                    {error && <p>{error}</p>}
                    <span>Have an account? <Link href="/login">Login</Link></span>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Register;
