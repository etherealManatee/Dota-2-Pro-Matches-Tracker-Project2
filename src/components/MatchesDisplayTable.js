import React, {useRef} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import moment from 'moment'
import winner_icon from "../images/winner-icon.png"
import {Link} from "react-router-dom";
// moment.locale()

function MatchesDisplayTable({data}) {
    // let theTable = document.querySelector("#theTable")
    // window.addEventListener('scroll', function(){
    //     console.log(theTable)
    //     console.log("helllo")
    //     // if(theTable.scrollTop + theTable.clientHeight >= theTable.scrollHeight){
    //     //     console.log('hello')
    //     // }
    // })
    function clicked(e){
        console.log(e.target.value)
    }
    return (
            <Container>
                <Row className="mt-2">
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Radiant Team</th>
                            <th>Dire Team</th>
                            <th>Date & Start Time(SGT)</th>
                            <th>League Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((e,i) => (
                            <tr key={i}>
                                <td><Link to={`/match/${e.match_id}`} onClick={clicked}>{e.match_id}</Link></td>
                                <td>{e.radiant_win && <img src={winner_icon} className="winnericon" alt="win"/>} {e.radiant_name}</td>
                                <td>{!e.radiant_win && <img src={winner_icon} className="winnericon" alt="win"/>} {e.dire_name}</td>
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

export default MatchesDisplayTable;