import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Col, Container, Row, Table} from "react-bootstrap";
import moment from 'moment'


function MatchPage() {
    let {matchid} = useParams()
    const [matchData, setMatchData] = useState([])
    const [heroes, setHeroes] = useState({})
    const [radiant, setRadiant] = useState([])
    const [dire, setDire] = useState([])

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/matches/${matchid}`)
            .then(success=>{
                setMatchData(success.data)
                setRadiant(success.data.players.slice(0,5))
                setDire(success.data.players.slice(5,10))
            })
            .catch(failed=>{
                console.log("failure3")
            })
    },[matchid])

    useEffect(()=>{
        axios.get("https://api.opendota.com/api/constants/heroes")
            .then(success=>{
                setHeroes(success.data)
            })
            .catch(failed=>{
                console.log("failure4")
            })
    },[])

    return (
        <Container>
            <Row className="mt-2">
                <Col className="col-4 text-white">
                    <Row className="justify-content-center text-success ">
                        <h2>VICTOR</h2>
                    </Row>
                    {matchData.radiant_win ?
                        <>
                            <Row className="justify-content-center align-items-center">
                                <img className="winningTeam" src={matchData.radiant_team?.logo_url} alt="team logo"/>
                                <div>{matchData.radiant_team?.name} </div>
                            </Row>
                            <Row className="justify-content-center text-danger mt-4">
                                <h6>LOSER</h6>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <img className="losingTeam" src={matchData.dire_team?.logo_url} alt="team logo"/>
                                <div>{matchData.dire_team?.name} </div>
                            </Row>
                        </>
                        :
                        <>
                            <Row className="justify-content-center align-items-center">
                                <img className="winningTeam" src={matchData.dire_team?.logo_url} alt="team logo"/>
                                <div>{matchData.dire_team?.name} </div>
                            </Row>
                            <Row className="justify-content-center text-danger mt-4">
                                <h6>LOSER</h6>
                            </Row>
                            <Row className="justify-content-center align-items-center">
                                <img className="losingTeam" src={matchData.radiant_team?.logo_url} alt="team logo"/>
                                <div>{matchData.radiant_team?.name} </div>
                            </Row>
                        </>
                    }
                </Col>
                <Col className="col-4 text-white">
                    <Row className="justify-content-center">Match ID: {matchid}</Row>
                    <Row className="justify-content-center">{moment(matchData.start_time*1000).endOf('hour').fromNow()}</Row>
                    <Row className="justify-content-center mt-3">-match-duration-suppose-to-be-here-</Row>
                    <Row className="justify-content-center mt-3"><h5>SCORE</h5></Row>
                    <Row className="justify-content-center">
                        {matchData.radiant_win ?
                            <>
                                <h3 className="text-success">{matchData.radiant_score}</h3>
                                <h3>:</h3>
                                <h3 className="text-danger">{matchData.dire_score}</h3>
                            </>
                            :
                            <>
                                <h3 className="text-success">{matchData.dire_score}</h3>
                                <h3>:</h3>
                                <h3 className="text-danger">{matchData.radiant_score}</h3>
                            </>
                        }
                    </Row>
                </Col>
                <Col className="col-4 text-white justify-content-center align-content-center">
                    <Row className="justify-content-center mt-5"><h5>LEAGUE</h5></Row>
                    <Row className="justify-content-center">{matchData.league?.name}</Row>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="col-6">
                    <Row className="my-2 mx-auto">
                        {matchData.radiant_win ?
                            <>
                                <h4 className="text-white mx-3">Radiant Team Won</h4>
                                <h4 className="text-success">{matchData.radiant_team?.name}</h4>
                            </>
                            :
                            <>
                                <h4 className="text-white mx-3">Dire Team Won</h4>
                                <h4 className="text-success">{matchData.dire_team?.name}</h4>
                            </>
                        }
                    </Row>
                    <Table bordered striped variant="info">
                        <thead>
                        <tr>
                            <th>Player/Hero</th>
                            <th>Kill(s)</th>
                            <th>Death(s)</th>
                            <th>Assist(s)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {matchData.radiant_win ?
                            radiant.map((e,i)=>(
                                <tr key={i}>
                                    <td>{e.name} <img className="heroImage" src={`https://api.opendota.com${heroes[e.hero_id]?.img}`} alt="hero-icon"/></td>
                                    <td>{e.kills}</td>
                                    <td>{e.deaths}</td>
                                    <td>{e.assists}</td>
                                </tr>
                                ))
                            :
                            dire.map((e,i)=>(
                                <tr key={i}>
                                    <td>{e.name} <img className="heroImage" src={`https://api.opendota.com${heroes[e.hero_id]?.img}`} alt="hero-icon"/></td>
                                    <td>{e.kills}</td>
                                    <td>{e.deaths}</td>
                                    <td>{e.assists}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-6">
                    <Row className="my-2 mx-auto">
                        {!matchData.radiant_win ?
                            <>
                                <h4 className="text-white mx-3">Radiant Team Lost</h4>
                                <h4 className="text-danger">{matchData.radiant_team?.name}</h4>
                            </>
                            :
                            <>
                                <h4 className="text-white mx-3">Dire Team Lost</h4>
                                <h4 className="text-danger">{matchData.dire_team?.name}</h4>
                            </>
                        }
                    </Row>
                    <Table bordered striped variant="info">
                        <thead>
                        <tr>
                            <th>Player/Hero</th>
                            <th>Kill(s)</th>
                            <th>Death(s)</th>
                            <th>Assist(s)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!matchData.radiant_win ?
                            radiant.map((e,i)=>(
                                <tr key={i}>
                                    <td>{e.name} <img className="heroImage" src={`https://api.opendota.com${heroes[e.hero_id]?.img}`} alt="hero-icon"/></td>
                                    <td>{e.kills}</td>
                                    <td>{e.deaths}</td>
                                    <td>{e.assists}</td>
                                </tr>
                            ))
                            :
                            dire.map((e,i)=>(
                                <tr key={i}>
                                    <td>{e.name} <img className="heroImage" src={`https://api.opendota.com${heroes[e.hero_id]?.img}`} alt="hero-icon"/></td>
                                    <td>{e.kills}</td>
                                    <td>{e.deaths}</td>
                                    <td>{e.assists}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    );
}

export default MatchPage;