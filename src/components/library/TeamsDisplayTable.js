import React, {useEffect, useState} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import moment from "moment";
import {Link} from "react-router-dom";

function TeamsDisplayTable({teams}) {
    const [filteredTeams, setFilteredTeams] = useState([])

    function filtering(ele){
        return ele.last_match_time > 1601139882
    }

    let filtered = teams.filter(filtering)
    useEffect(()=>{
        setFilteredTeams(filtered)
    },[teams])

    return (
        <Container>
            <Row className="justify-content-center mt-3 text-white">
                <h2>Pro Teams</h2>
            </Row>
            <Row>
                <Table striped bordered variant="secondary">
                    <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Last played</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTeams.map((e,i)=>(
                        <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td><img className="logo" src={e.logo_url} alt="team-logo"/><Link to={`/team/${e.team_id}`}>{e.name}</Link></td>
                            <td>{moment(e.last_match_time*1000).endOf('hour').fromNow()}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default TeamsDisplayTable;