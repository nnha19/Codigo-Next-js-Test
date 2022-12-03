import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SnackbarProvider } from "notistack";

import Layout from "../components/Layout";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
