
import { useEffect, useMemo, useState } from 'react';
import { GameState } from '../server/types/GameState';
import { proxyClient } from './util/proxyClient';

export default function StateRouter({ children }: StateRouterProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const subscription = proxyClient.game.state.subscribe(undefined, {
      onStarted() {
        console.log('connected')
      },
      onData(data: GameState) {
        console.log('received', data);
        setGameState(data)
      },
      onError(err) {
        console.error('error', err);
      },
    });
    return () => {
      subscription.unsubscribe()
    }
  }, []);

  let routes = useMemo(() => {
    let routes = new Map<GameState, JSX.Element>()
    children.forEach((route) => {
      routes.set(route.props.value, route)
    })
    return routes;
  }, [children])

  if (!gameState)
    return <>loading</>

  return routes.get(gameState) || <>Invalid state</>
}

export type StateRouterProps = {
  children: React.ReactElement[];
}

export function StateRoute({ value, children }: StateRouteProps) {
  return <>{children}</>
}

export type StateRouteProps = {
  value: GameState;
  children: React.ReactElement;
}