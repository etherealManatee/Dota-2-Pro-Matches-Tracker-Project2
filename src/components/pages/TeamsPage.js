import React, {useEffect, useState} from 'react';
import axios from "axios";
import TeamsDisplayTable from "../library/TeamsDisplayTable";

function TeamsPage(props) {
    const [teams,setTeams] = useState([])

    useEffect(()=>{
        axios.get("https://api.opendota.com/api/teams")
            .then(success=>{
                setTeams(success.data)
            })
    },[])

    return (
        <TeamsDisplayTable teams={teams}/>
    );
}

export default TeamsPage;