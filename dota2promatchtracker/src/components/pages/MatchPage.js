import React, {useEffect, useState} from 'react';
import MatchesDisplayTable from "../MatchesDisplayTable";
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";
import moment from 'moment'


function MatchPage() {
    let {matchid} = useParams()
    const [matchData, setMatchData] = useState([])
    // const [victor, setVictor] = useState("")
    const [radiantTeam, setRadiantTeam] = useState({})
    // const [direTeam, setDireTeam] = useState({})

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/matches/${matchid}`)
            .then(success=>{
                setMatchData(success.data)
                setRadiantTeam(success.data.radiant_team)
                console.log("suc")
            })
            .catch(failed=>{
                console.log("failure3")
            })
    },[matchid])
    console.log(matchData)
    // useEffect(()=>{
    //     console.log(matchData)
    //     setRadiantTeam(matchData.radiant_team)
    //     setDireTeam(matchData.dire_team)
    //     if (matchData.radiant_win){
    //         console.log(radiantTeam)
    //     } else {
    //         console.log(direTeam)
    //     }
    // },[matchData])



    return (
        <Container>
            <Row className="mt-2">
                <Col className="col-4 text-white">
                    {matchData.radiant_win ?
                        <>
                            <Row className="justify-content-center text-success ">
                                <p>WINNER</p>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <img className="winningTeam" src={matchData.radiant_team?.logo_url}/>
                                <div>{matchData.radiant_team?.name} </div>
                            </Row>
                        </>
                        :
                        <>
                            <img className="winningTeam" src={matchData.dire_team?.logo_url}/>
                            <div>{matchData.dire_team?.name} </div>
                        </>
                    }
                </Col>
                <Col className="col-4 text-white">
                    <Row className="justify-content-center">Match ID: {matchid}</Row>
                    <Row className="justify-content-center">{moment(matchData.start_time*1000).endOf('hour').fromNow()}</Row>
                    <Row className="justify-content-center">{moment.duration(matchData?.duration)}</Row>
                    <Row className="justify-content-center">

                    </Row>
                </Col>
                <Col className="col-4 text-white">{matchData.league?.name}</Col>
            </Row>
            <Row>
                <Col className="col-6">table</Col>
                <Col className="col-6">table</Col>
            </Row>
        </Container>

    );
}

export default MatchPage;