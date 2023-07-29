import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { usePromiseTracker } from 'react-promise-tracker';
import ConfirmationDialog from '../common/components/dialogs/confirmation';
import LoadingBackdrop from '../common/components/loadingBackdrop';
import Header from '../common/components/header';
import Authenticate from '../common/components/authenticate';
import { Session } from 'next-auth';
import '../index.css';

function App({
  Component,
  pageProps
}: AppProps<{
  session: Session;
}>) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Head>
        <title>Smote</title>
      </Head>
      <RecoilRoot>
        <Authenticate>
          <>
            <Header />
            <Component {...pageProps} />
          </>
        </Authenticate>
        <ConfirmationDialog />
        <LoadingBackdrop show={promiseInProgress} />
      </RecoilRoot>
    </>
  );
}

export default App;
