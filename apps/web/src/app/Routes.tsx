import { Switch, Route } from "react-router-dom";
import { useTokenStore } from "../global-stores/useTokenStore";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/Leaderboard";
import MatchChatPage from "./pages/MatchChatPage";
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
          <Route exact path={`/messages`} component={MessagesPage} />
          <Route exact path={`/messages/:matchId`} component={MatchChatPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <Route component={NotFoundPage} />
    </Switch>
  );
};
