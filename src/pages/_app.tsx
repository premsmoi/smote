import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from "recoil";
import { usePromiseTracker } from "react-promise-tracker";
import { SessionProvider } from "next-auth/react"
import ConfirmationDialog from '../common/components/dialogs/confirmation';
import LoadingBackdrop from '../common/components/loadingBackdrop';
import Header from '../common/components/header';
import Authenticate from '../common/components/authenticate';
import '../styles/index.scss';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Head>
        <title>Smote</title>
      </Head>
      <RecoilRoot>
        <SessionProvider session={session}>
          <Authenticate>
            <Header />
            <Component {...pageProps} />
          </Authenticate>
          <ConfirmationDialog />
          <LoadingBackdrop show={promiseInProgress} />
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default App;