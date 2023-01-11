import '../styles/globals.css'
import "../styles/Navbar.modules.css";

import {AuthContextProvider} from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
  );
}

export default MyApp
