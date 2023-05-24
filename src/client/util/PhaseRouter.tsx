import { useContext, useMemo } from "react";
import { Phase } from "../../server/types/Phase";
import { GameStateContext } from "./GameStateContext";
import Loading from "../component/Loading";

export default function PhaseRouter({ children }: PhaseRouterProps) {
  const { phase } = useContext(GameStateContext);

  let routes = useMemo(() => {
    let routes = new Map<Phase, JSX.Element>();
    children.forEach((route) => {
      routes.set(route.props.value, route);
    });
    return routes;
  }, [children]);

  if (!phase) return <Loading className="bg-b" />;

  return routes.get(phase) || <>Invalid state</>;
}

export type PhaseRouterProps = {
  children: React.ReactElement[];
};

export function PhaseRoute({ value, children }: PhaseRouteProps) {
  return <>{children}</>;
}

export type PhaseRouteProps = {
  value: Phase;
  children: React.ReactElement;
};
