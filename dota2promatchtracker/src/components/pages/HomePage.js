import React from 'react';
import MatchesDisplayTable from "../MatchesDisplayTable";
import { useLocation } from 'react-router-dom';
import axios from "axios";

// const useQuery = () => new URLSearchParams(useLocation().search);

function HomePage({latestData}) {
    // let query = useQuery();
    // let pageNumber = parseInt(query.get('page'))

    return (
        <MatchesDisplayTable data={latestData}/>
    );
}

export default HomePage;