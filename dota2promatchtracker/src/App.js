import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./components/general/Navigation";
import { useEffect, useState} from "react";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import UnfilteredNotHomePage from "./components/pages/UnfilteredNotHomePage";

function App() {
    const [firstData, setFirstData] = useState([])
    const [allData, setAllData] = useState([])

    //pulls the first set of pro matches and set it to firstData and allData
    useEffect(()=>{
        axios.get("https://api.opendota.com/api/proMatches")
            .then(success=>{
                setFirstData(success.data)
                setAllData(success.data)
            })
            .catch(failed =>{
                console.log("failure1")
            })
    },[]) //only run once

  return (
      <BrowserRouter>
        <Navigation />
        <Switch>
            <Route path="/" exact>
                <HomePage firstData={firstData} />
            </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
