import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/Leaderboard";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={HomePage} />
      <Route exact path={`/leaderboard`} component={LeaderBoard} />
    </Switch>
  );
};
