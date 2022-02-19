import '../styles/globals.css'
import { PageLayout } from 'layouts/PageLayout'
import { ThirdwebProvider } from "@3rdweb/react";
import { MATIC_CHAIN_ID } from 'config';

function App({ Component, pageProps }) {
  // Polygon Mumbai chain ID is 80001, see https://chainlist.org
  const supportedChainIds = [MATIC_CHAIN_ID];

  // We'll only support MetaMask which is an injected connector
  const connectors = {
    injected: {},
  };

  return (
    <ThirdwebProvider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
    >
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThirdwebProvider>
  )
}

export default App
