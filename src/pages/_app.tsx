import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';
import { usePromiseTracker } from 'react-promise-tracker';
import ConfirmationDialog from '@src/components/dialogs/confirmation/confirmation';
import LoadingBackdrop from '@src/components/loading-backdrop/loading-backdrop';
import Header from '@src/components/header/header';
import Authenticate from '@src/components/authenticate';
import '@src/index.css';

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
