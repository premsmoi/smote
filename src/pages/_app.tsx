import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';
import { usePromiseTracker } from 'react-promise-tracker';
import ConfirmationDialog from '@src/components/dialogs/confirmation';
import LoadingBackdrop from '@src/components/loadingBackdrop';
import Header from '@src/components/header';
import Authenticate from '@src/components/authenticate';

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
