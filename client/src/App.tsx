import { useEffect, useState } from 'react';
import { httpBatchLink } from '@trpc/client';
import { createTRPCProxyClient } from '@trpc/react';
import type { AppRouter } from '../../server/src/app-router';

const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`
  })]
});

function App() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    (async function getHelloWorld() {
      const response = await proxyClient.helloWorld.query();
      setQuote(response.quote);
    })();
  }, []);

  return (
    <div>
      <header>
        {quote}
      </header>
    </div>
  );
}

export default App;
