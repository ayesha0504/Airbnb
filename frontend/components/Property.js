// import React from 'react';
import { Container, Card, CardImg, Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Details({ property }) {
  const nav=useNavigate();
  const handleFavourite=(e, property)=>{
    
    if(localStorage.getItem('username') != null)
    {
    e.preventDefault();
    console.log(localStorage.getItem('username'));
    console.log(property.property_id);
        fetch(`/favourites`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'property_id':property.property_id,
              'username':JSON.parse(localStorage.getItem('username'))
          }
      })
          .then(res => res.json())
          .then((data) => {
              
                  alert(data.message);
           
          })
          .catch((error) => {
              console.log(error.message);
          });
        }
        else{
          nav('/login');
        }
  }
  return (
    <> 
      <div className="banner">
        <h1>{property.title}</h1>
        <p>{property.category}</p>
        <p>{property.location}</p>
      </div>
      <section className="single-room">
        <div className="single-room-images">
          <img className="d-block w-100 img-thumbnail" src={property.img1} />
          <img className="d-block w-100 img-thumbnail" src={property.img2} />
          <img className="d-block w-100 img-thumbnail" src={property.img3} />
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{property.description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : {property.price}</h6>
            <h6>size : {property.bedrooms} </h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras </h6>
        <ul className="extras">
          <li>Amenitites: {property.amenities}</li>
          <li>Cleaning fee: {property.cleaning_fee} per hour</li>
          
        </ul>
      </section>
      <section>
      <p><a href="" style={{ margin: '5px' }} ><Button variant="primary" onClick={e => 
        handleFavourite(e, property)}>Add Favourite</Button></a></p>
        <p><Link to={`/makereservation/${property.property_id}`}><Button variant="primary">Book Reservation</Button></Link></p>
        <p><Link to={`/rateproperty/${property.property_id}`}><Button variant="primary">Rate Property</Button></Link></p>
        <p><Link to={`/showrating/${property.property_id}`}><Button variant="primary">Show ratings</Button></Link></p>
      </section>
    </>
  );
}

function Cardrow({ property, onSelect}) {

   

  return (
    <Card
      style={{ width: "18rem", size: 300, margin: 50 }}
      key={property.title}
      onClick={() => {
        onSelect(property);
      }}
    >
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
        <Card.Title style={{ fontWeight: "bold" }}>{property.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          {property.location}
        </Card.Text>
        <Card.Text style={{ textAlign: "center" }}>{property.price} per night</Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          {property.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function Table({ property, testFunc}) {
  const rows = [];
  property.forEach((property) => {
    rows.push(
      <Cardrow key={property.title} property={property} onSelect={testFunc}/>
    );
  });
  return <div className="row justify-content-center">{rows}</div>;
}

function Search(props) {
  var [selectedProp, setSelectedProp] = useState({});
  var [data, setData] = useState([]);
  var [filterVal, setFilterVal] = useState("");
  var [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setData(props.property);
      setSearchApiData(props.property);
    };
    fetchData();
  },[props]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.location.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        // setData([{"property":"No Data"}])
        window.alert(e.target.value + " not found!!!");
      }
    }
    setFilterVal(e.target.value);
  };


  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={props.filterVal}
        onInput={(e) => handleFilter(e)
        }
        style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginLeft:"auto", marginRight:'auto'}}
      />

      <Container className="Table">
        
      {selectedProp.title ? (
          <div>
            {/* {selectedProp.title},{selectedProp.title} */}
            {/* <Table property={selectedProp} testFunc={setSelectedProp} /> */}
            <Details property={selectedProp} />
          </div>
        ) : (
          <Table property={data} testFunc={setSelectedProp} />
        )}
        
      </Container>
    </div>
  );
}

function Property() {
  useEffect( () => {
    fetchItems();
  }, []);
  
  const [property, setProperty] = useState([]);
  
  const fetchItems = async () => {
    const data = await fetch('/properties');
    const property = await data.json();
    console.log(property);
    setProperty(property);
  };
  return (
    <div style={{paddingLeft:"2.5rem", maxWidth:"100%", overflowY:"hidden"}}>
      <br></br>
      {/* <input type = 'search' placeholder='Search Property' /> */}
      <Container className="search">
        <Search property={property} />
      </Container>
    </div>
  );
}

export default Property;

