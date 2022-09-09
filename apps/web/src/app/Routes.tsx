import { Switch, Route } from "react-router-dom";
import { useTokenStore } from "../global-stores/useTokenStore";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/Leaderboard";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";

export const Routes: React.FC = () => {
  const hasTokens = useTokenStore((v) => !!v.accessToken && !!v.accessToken);

  return (
    <Switch>
      {/* PUBLIC ROUTES */}
      <Route exact path={`/`} component={HomePage} />
      <Route exact path={`/leaderboard`} component={LeaderBoard} />

      {/* PRIVATE ROUTES */}
      {hasTokens && (
        <Switch>
          <Route path={`/messages`} component={MessagesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <Route component={NotFoundPage} />
    </Switch>
  );
};
