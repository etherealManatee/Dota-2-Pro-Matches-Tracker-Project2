import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Container, Row, Table} from "react-bootstrap";
import moment from "moment";

function SelectedTeamPage(props) {
    let {teamid} = useParams()
    let [teamMatches, setTeamMatch] = useState([])
    let [selectedTeam, setSelectedTeam] = useState("")

    function filtering2(e){
        return e.start_time > 1607407157
    }

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/teams/${teamid}/matches`)
            .then(success=>{
                let filtered2 = success.data.filter(filtering2)
                setTeamMatch(filtered2)
            })
    },[teamid])

    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/teams/${teamid}`)
            .then(success=>{
                setSelectedTeam(success.data)
            })
    },[teamid])

    return (
        <Container>
            <Row className="justify-content-center text-white my-3">
                <h1>{selectedTeam.name}</h1>
            </Row>
            <Row className="justify-content-center text-info">
                <img src={selectedTeam.logo_url} alt="team-logo"/>
            </Row>
            <Row className="mt-4">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Opposing Team</th>
                        <th>Result</th>
                        <th>Date & Start Time(SGT)</th>
                        <th>League Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teamMatches.map((e,i) => (
                        <tr key={i}>
                            <td><Link to={`/match/${e.match_id}`}>{e.match_id}</Link></td>
                            <td><img src={e.opposing_team_logo} className="losingTeam" alt="opposing-team-logo"/> {e.opposing_team_name}</td>
                            <td>{(e.radiant & e.radiant_win) | (!e.radiant & !e.radiant_win) ? "Won" : "Lost"}</td>
                            <td>{moment(e.start_time * 1000).format("Do MMMM YYYY h:mm a")}</td>
                            <td>{e.league_name}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default SelectedTeamPage;