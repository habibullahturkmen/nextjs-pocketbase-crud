import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import {AuthContext} from "../context/authContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Login = () => {

    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
    });
    const [error, setError] = React.useState(null);

    const router = useRouter();

    const { currentUser, login } = React.useContext(AuthContext);

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
            await login(inputs);
            await router.push("/");
        } catch (err) {
            setError("invalid email or password, try again");
        }
    }

    return (
        <>
            <Navbar />
            <div className="auth">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        required type="text"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <input
                        required type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                    >
                        Login
                    </button>
                    {error && <p>{error}</p>}
                    <span>Don&apos;t have an account? <Link href="/register">Register</Link></span>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;
