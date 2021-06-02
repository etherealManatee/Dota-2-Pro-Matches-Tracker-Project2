import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";
import MatchesDisplayTable from "../MatchesDisplayTable";
import axios from "axios";
import {useParams} from 'react-router-dom'


function UnfilteredNotHomePage({data}) {
    const [newData, setNewData] = useState([])
    let {number} = useParams()

    let lastId = data[data.length-1].match_id
    console.log(lastId)

    //using page number it sets the newData state

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
            .then(success=>{
                setNewData(success.data)
            })
            .catch(failed=>{
                console.log('failure2')
            })
    },[])

    // function getNewData(){
    //     setNewData(latestData)
    //     for(let e = 1; e < {number}; e++){
    //         let lastId = newData[newData.length-1]
    //         axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
    //             .then(success=>{
    //                 setNewData(success.data)
    //             })
    //     }}
    return (
        <MatchesDisplayTable data={newData}/>
    );
}

export default UnfilteredNotHomePage;