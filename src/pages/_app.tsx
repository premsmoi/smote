import type { AppProps } from 'next/app';
import { RecoilRoot } from "recoil";
import ConfirmationDialog from '../common/components/dialogs/confirmation';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <ConfirmationDialog />
    </RecoilRoot>
  );
}

export default App;