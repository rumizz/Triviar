import { useEffect, useState } from 'react';
import { httpBatchLink } from '@trpc/client';
import { createTRPCProxyClient, createWSClient, splitLink, wsLink } from '@trpc/react';
import type { AppRouter } from '../../server/src/router/router';
import { Unsubscribable } from '@trpc/server/observable';
import clsx from 'clsx';
import './index.css';

const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: createWSClient({
          url: `ws://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_WEBSOCKET_PORT}`,
        }),
      }),
      false: httpBatchLink({
        url: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      }),
    })
  ]
});

function App() {
  const [quote, setQuote] = useState('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    const subscription = proxyClient.game.state.subscribe(undefined, {
      onStarted() {
        console.log('connected')
      },
      onData(data) {
        console.log('received', data);
        setState(data)
      },
      onError(err) {
        console.error('error', err);
      },
    });
    return () => {
      subscription.unsubscribe()
    }
  }, []);


  useEffect(() => {
    proxyClient.helloWorld.query()
      .then((response) => setQuote(response.quote))
  }, []);


  return (
    <div>
      <header>
        {quote}
        <div className='flex flex-row p-2 gap-2'>
          {['A', 'B', 'C', 'D'].map(option =>
            <button className={clsx('px-4 py-2 rounded-md', { 'bg-black text-white': state !== option, 'bg-gray-200 text-black': state === option, })} key={option} onClick={() => proxyClient.game.set.query(option)}>
              {option}
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
