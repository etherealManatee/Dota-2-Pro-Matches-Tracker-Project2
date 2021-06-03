import React, {useEffect, useState} from 'react';
import MatchesDisplayTable from "../MatchesDisplayTable";
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";
import moment from 'moment'


function MatchPage() {
    let {matchid} = useParams()
    const [matchData, setMatchData] = useState([])

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/matches/${matchid}`)
            .then(success=>{
                setMatchData(success.data)
                console.log("suc1")
            })
            .catch(failed=>{
                console.log("failure3")
            })
    },[matchid])
    console.log(matchData)
    // console.log(moment.duration(matchData.duration, 'minutes'))

    return (
        <Container>
            <Row className="mt-2">
                <Col className="col-4 text-white">
                    {matchData.radiant_win ?
                        <>
                            <Row className="justify-content-center text-success ">
                                <h2>VICTOR</h2>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <img className="winningTeam" src={matchData.radiant_team?.logo_url} alt="team logo"/>
                                <div>{matchData.radiant_team?.name} </div>
                            </Row>
                            <Row className="justify-content-center text-success ">
                                <h6>LOSER</h6>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <img className="losingTeam" src={matchData.dire_team?.logo_url} alt="team logo"/>
                                <div>{matchData.dire_team?.name} </div>
                            </Row>
                        </>
                        :
                        <>
                            <img className="winningTeam" src={matchData.dire_team?.logo_url} alt="team logo"/>
                            <div>{matchData.dire_team?.name} </div>
                        </>
                    }
                </Col>
                <Col className="col-4 text-white">
                    <Row className="justify-content-center">Match ID: {matchid}</Row>
                    <Row className="justify-content-center">{moment(matchData.start_time*1000).endOf('hour').fromNow()}</Row>
                    <Row className="justify-content-center">*insert match duration here*</Row>
                    <Row className="justify-content-center"><h5>SCORE</h5></Row>
                    <Row className="justify-content-center">
                        {matchData.radiant_win ?
                            <>
                                <h3 className="text-success">{matchData.radiant_score}</h3>
                                <h3>:{matchData.dire_score}</h3>
                            </>
                            :
                            <>
                                <h3 className="text-success">{matchData.dire_score}</h3>
                                <h3>:{matchData.radiant_score}</h3>
                            </>
                        }
                    </Row>
                </Col>
                <Col className="col-4 text-white justify-content-center align-content-center">
                    <Row className="justify-content-center"><h5>LEAGUE</h5></Row>
                    <Row className="justify-content-center">{matchData.league?.name}</Row>
                </Col>
            </Row>
            <Row>
                <Col className="col-6">table</Col>
                <Col className="col-6">table</Col>
            </Row>
        </Container>

    );
}

export default MatchPage;