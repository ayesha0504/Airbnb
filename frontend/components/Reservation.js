//import React from 'react'
import { Container, Card, CardImg, Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams} from "react-router-dom";

function Cardrow({ rating}) {
    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(rating._id)
        fetch(`/reservations`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'username': JSON.parse(localStorage.getItem('username')),
            'object_id':rating._id
            
        }
      })
      .then(res => res.json())
            .then((data) => {
                alert(data.message);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
      }

    return (
      <Card style={{ margin:"3rem" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{rating.username} Reservation</Card.Title>
          <Card.Text style={{ textAlign: "center" }}>Property ID of the reserved property is {rating.property_id} </Card.Text>
          <Card.Text style={{ textAlign: "center" }}>
            Reservation Dates : <strong>{rating.start_date} to {rating.end_date} </strong>
          </Card.Text>
          <Button variant="primary" onClick={handleSubmitClick} style={{margin:'5px'}}>Delete</Button>
        </Card.Body>
      </Card>
    );
  }    
  
function Reservation() {
    useEffect( () => {
        fetchItems();
      }, []);
      
      const [rating, setRating] = useState([]);
      
      const fetchItems = async () => {
        const data = await fetch(`/reservations`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'username':JSON.parse(localStorage.getItem('username'))
            }
        })
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
  )
}

export default Reservation