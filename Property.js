import React from 'react';
import {Container, Card, CardImg, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cardrow({property}){
    return(
    <Card style={{ width: '18rem',size: 300, margin:50 }}>
    <Carousel>
      <Carousel.Item>
        <CardImg
          className="d-block w-100 img-thumbnail"
          src={property.img1}
          variant="top"
        />
      </Carousel.Item>
      <Carousel.Item>
        <CardImg
          className="d-block w-100 img-thumbnail"
          src={property.img2}
          variant="top"
        />
      </Carousel.Item>
      <Carousel.Item>
        <CardImg
          className="d-block w-100 img-thumbnail"
          src={property.img3}
          variant="top"
        />
      </Carousel.Item>
    </Carousel>
      <Card.Body>
        <Card.Title style={{ fontWeight:"bold" }}>{property.title}</Card.Title>
        <Card.Text style={{ textAlign:"center" }}>
          {property.price}
        </Card.Text>
        <Card.Text style={{ textAlign:"justify" }}>
          {property.description}
        </Card.Text>
        
      </Card.Body>
    </Card>
    );
}
function Table({property})
{
  const rows=[];
  property.forEach((property) => {
  rows.push( 
    <Cardrow
         property={property}
         key={property.name} />
  );
  });
  return (
    <div className="row justify-content-center">
      {rows}
    </div>
  );
}
function Search()
{
  return (
    <form>
      <input type="search" placeholder="Type location" />
    </form>
  );
}

function Property({property}) {
  return (
    <div>
        <Container className="search">
        <Search/>
        </Container>
        <Container className="Table">
        <Table property={property} />
        </Container>
    </div>
  );
}

export default Property;