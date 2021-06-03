import React, {useEffect, useState} from 'react';
import MatchesDisplayTable from "../MatchesDisplayTable";
//import { useLocation } from 'react-router-dom';
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";

// const useQuery = () => new URLSearchParams(useLocation().search);

function HomePage() {
    // let query = useQuery();
    // let pageNumber = parseInt(query.get('page'))
    const [data, setData] = useState([])
    const [theIds, setTheIds] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [firstData, setFirstData] = useState([])

    //pulls the first set of pro matches and set it to firstData
    useEffect(()=>{
        axios.get("https://api.opendota.com/api/proMatches")
            .then(success=>{
                setFirstData(success.data)
            })
            .catch(failed =>{
                console.log("failure1")
            })
    },[]) //only run once

    //sets current data
    useEffect(()=>{
        setData(firstData)
    },[firstData])

    // when next is clicked, find first&last id of current data. set new data, push new data
    function nextPage(){
        setPageNumber(prevState => prevState+= 1)
        setTheIds(prevState => [...prevState,data[0].match_id])
        let lastId = data[data.length-1].match_id
        console.log("n",lastId)
        axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${lastId}`)
            .then(suc=>{
                setData(suc.data)
            })
    }
    console.log("o",theIds)

    function prevPage(){
        setPageNumber(prevState => prevState -= 1)
        let idToSearch = theIds[theIds.length-1] + 1
        axios.get(`https://api.opendota.com/api/proMatches?less_than_match_id=${idToSearch}`)
            .then(suc=>{
                setData(suc.data)
                theIds.pop()
                setTheIds([...theIds])
            })

    }

    return (
        <Container>
            <Row>
                <Col className="col-4 my-3">
                    {theIds.length ? <Button variant="info" size="sm" onClick={prevPage}> Prev</Button>: null}
                </Col >
                <Col className="col-4 my-3 text-center align-items-center text-white">Page {pageNumber}</Col>
                <Col className="col-4 text-right my-3">
                    <Button variant="info" size="sm" onClick={nextPage} > Next</Button>
                </Col>
            </Row>
            <MatchesDisplayTable data={data}/>
            <Row>
                <Col className="col-4 my-3">
                    {theIds.length ? <Button variant="info" size="sm" onClick={prevPage}> Prev</Button>: null}
                </Col >
                <Col className="col-4 my-3 text-center align-items-center text-white">Page {pageNumber}</Col>
                <Col className="col-4 text-right my-3">
                    <Button variant="info" size="sm" onClick={nextPage} > Next</Button>
                </Col>
            </Row>
        </Container>

    );
}

export default HomePage;