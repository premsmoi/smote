import type { AppProps } from 'next/app';
import { RecoilRoot } from "recoil";
import { usePromiseTracker } from "react-promise-tracker";
import ConfirmationDialog from '../common/components/dialogs/confirmation';
import LoadingBackdrop from '../common/components/loadingBackdrop';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <ConfirmationDialog />
      <LoadingBackdrop show={promiseInProgress} />
    </RecoilRoot>
  );
}

export default App;