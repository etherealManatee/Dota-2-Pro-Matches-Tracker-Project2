import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./components/general/Navigation";
import { useEffect, useState} from "react";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import MatchPage from "./components/pages/MatchPage";

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
        </Switch>
      </BrowserRouter>
  );
}

export default App;
