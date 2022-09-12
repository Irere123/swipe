import React from "react";
import { Switch, Route } from "react-router-dom";
import { useTokenStore } from "../global-stores/useTokenStore";
import AccountSetup from "./pages/AccountSetup";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/Leaderboard";
import MatchChatPage from "./pages/MatchChatPage";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfilePage from "./pages/UserProfilePage";

export const Routes: React.FC = () => {
  const hasTokens = useTokenStore((v) => !!v.accessToken && !!v.accessToken);

  return (
    <Switch>
      {/* PUBLIC ROUTES */}
      <Route exact path={`/`} component={HomePage} />
      <Route exact path={`/leaderboard`} component={LeaderBoard} />
      <Route exact path={`/u/:userId`} component={UserProfilePage} />

      {/* PRIVATE ROUTES */}
      {hasTokens && (
        <Switch>
          <Route exact path={`/messages`} component={MessagesPage} />
          <Route exact path={`/account-setup`} component={AccountSetup} />
          <Route exact path={`/messages/:matchId`} component={MatchChatPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <Route component={NotFoundPage} />
    </Switch>
  );
};
