import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./components/general/Navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import UnfilteredNotHomePage from "./components/pages/UnfilteredNotHomePage";

function App() {
    const [latestData, setLatestData] = useState([])

    useEffect(()=>{
        axios.get("https://api.opendota.com/api/proMatches")
            .then(success=>{
                setLatestData(success.data)
            })
            .catch(failed =>{
                console.log("failure1")
            })
    },[])
    console.log(latestData)

    // function addMoreData() {
    //     let lastId = latestData[latestData.length-1]
    //     axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
    //         .then(success=>{
    //             setLatestData(prevState => [...prevState,...success.data])
    //             console.log('hello')
    //         })
    //         .catch(failed => {
    //             console.log("failure2")
    //         })
    // }

  return (
      <BrowserRouter>
        <Navigation />
        <Switch>
            <Route path="/" exact>
                <HomePage latestData={latestData} />
            </Route>
            <Route path="/page:number" exact>
                <UnfilteredNotHomePage data={latestData} />
            </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
