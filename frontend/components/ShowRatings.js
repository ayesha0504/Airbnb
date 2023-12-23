// import React from 'react';
import { Container, Card, CardImg, Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams} from "react-router-dom";


function Cardrow({ rating}) {

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold" }}>UserName: {rating.username}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          Rating:{rating.ratings}
        </Card.Text>
        <Card.Text style={{ textAlign: "center" }}>Comments: {rating.comments} </Card.Text>
      </Card.Body>
    </Card>
  );
}




         

function ShowRatings() {
  useEffect( () => {
    fetchItems();
  }, []);
  const params =useParams();
console.log(params.property_id);
console.log("not coming");
  const [rating, setRating] = useState([]);
  
  const fetchItems = async () => {
    const data = await fetch(`/ratings/${params.property_id}`);
    const rating = await data.json();
    console.log(rating);
    setRating(rating);
  };
  const rows = [];
  rating.forEach((rating) => {
    rows.push(
      <Cardrow key={rating.username} rating={rating} />
    );
  });
  return (
    <div style={{paddingLeft:"2.5rem", maxWidth:"100%", overflowY:"hidden"}}>
      <br></br>
      {/* <input type = 'search' placeholder='Search Property' /> */}
      <Container className="search">
      <div className="row justify-content-center">{rows}</div>
      </Container>
    </div>
  );
}

export default ShowRatings;