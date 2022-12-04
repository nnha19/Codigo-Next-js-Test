import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";

import Layout from "../components/Layout";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
