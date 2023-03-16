import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import TopHeader from '../components/Common/TopHeader/index';
import Loader from '../components/Loader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Langchain Application</title>
        <meta name="description" content="Customize langchain application" />
      </Head>

      <TopHeader />

      <Component {...pageProps} />

      <Loader />

      <ToastContainer
        position="top-right"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
