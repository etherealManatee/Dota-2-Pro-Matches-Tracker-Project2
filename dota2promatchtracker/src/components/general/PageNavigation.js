import React, {useState} from 'react';
import {Pagination, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";


function PageNavigation(props) {
    const [theNumbers,setTheNumbers] = useState([])
    let {pageNumber} = useParams()

    let items = [];
    for (let number = 1; number <= 10; number++) {
        items.push(
            <Link key={number} to={`/page${number}`} className={`m-2 py-2 px-3 border border-white pageNumbers ${pageNumber==number && 'numberActive'}`}>
                {number}
            </Link>,
        );
    }
    return (
        <Row className="justify-content-center">{items}</Row>
    );
}

export default PageNavigation;