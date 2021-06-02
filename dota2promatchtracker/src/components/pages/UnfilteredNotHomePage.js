import React, {useEffect, useState} from 'react';
import MatchesDisplayTable from "../MatchesDisplayTable";
import axios from "axios";
import {useParams} from 'react-router-dom'


function UnfilteredNotHomePage({firstData,allData}) {
    const [lastId, setLastId] = useState(null)
    const [newData, setNewData] = useState([])
    const [tempData, setTempData] = useState([])
    let {number} = useParams()

    //depending on firstData, setNewData and set a new lastId
    useEffect(()=>{
        setNewData(firstData)
        setLastId(firstData[firstData.length-1].match_id)
        console.log(lastId)
    },[firstData])


    useEffect(()=>{
        for (let i= 1; i<11; i++){
                axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
                .then(suc=>{
                    setTempData(suc.data)
                    setNewData(prevState => [prevState,tempData])
                    setLastId(tempData[tempData.length-1].match_id)
                })
                .catch(failed=>{
                    console.log('failure2')
                })

            console.log(tempData)
            console.log(lastId)
        }
    },[lastId])


    //the first lastid

    //using page number it sets the newData state

    // useEffect(()=>{
    //     if(number == 1){
    //         setNewData(data)
    //     }else if (number == 2){
    //         axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
    //             .then(success=>{
    //                 setNewData(success.data)
    //             })
    //             .catch(failed=>{
    //                 console.log('failure2')
    //             })
    //     } else {
    //
    //     }
    //
    // },[number])

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