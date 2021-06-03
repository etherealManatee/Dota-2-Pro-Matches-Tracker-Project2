import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./components/general/Navigation";
import HomePage from "./components/pages/HomePage";
import MatchPage from "./components/pages/MatchPage";
import TeamsPage from "./components/pages/TeamsPage";
import SelectedTeamPage from "./components/pages/SelectedTeamPage";

function App() {

  return (
      <BrowserRouter>
        <Navigation />
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/match/:matchid">
                <MatchPage />
            </Route>
            <Route path="/teams">
                <TeamsPage />
            </Route>
            <Route path="/team/:teamid">
                <SelectedTeamPage />
            </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
