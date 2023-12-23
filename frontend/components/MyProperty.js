
import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
import { Container, Card, CardImg, Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Details({ property }) {
  const nav=useNavigate();
  const handleSubmitClick = (e) => {
    e.preventDefault();
    fetch(`/properties/${property.property_id}`, {
      method: 'DELETE'
  })
    
        .then(() => {
            alert('delete successful');
            console.log('entered');
            nav("/");
        })
        .catch((error) => {
            console.log(error.message);
        });
  }
  return (
    <> 
      <div className="banner">
        <h1>{property.title}</h1>
        <p>{property.category}</p>
        <p>{property.location}</p>
      </div>
      <section className="single-room">
        
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
      <Link to={`/properties/update/${property.property_id}`}><Button variant="primary">Update</Button></Link>
        <Button variant="primary" onClick={handleSubmitClick} style={{margin:'5px'}}>Delete</Button>
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
    if(property.available==true){
    rows.push(
      <Cardrow key={property.title} property={property} onSelect={testFunc}/>
    );}
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
        onInput={(e) => handleFilter(e)}
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
function MyProperty () {
  const [property, setProperty] = useState([]);
  useEffect( () => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    console.log(localStorage.getItem('username'));
    const data = await fetch("/properties/my", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
          'username': JSON.parse(localStorage.getItem('username'))
      }
  });
    const property = await data.json();
    console.log(property);
    setProperty(property);
  };
   /* useEffect( () => {
        fetch("/properties/my", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({  // you will get user information from login form

              "username": JSON.parse(localStorage.getItem('user.username'))

          })
        })
            .then(res => res.json())
            .then((data) => {
                setProperty(data);
            })
    },[]);*/
    return (
      <div style={{paddingLeft:"2.5rem", maxWidth:"100%", overflowY:"hidden"}}>
      <br/>
      <Container><a href='/properties/add'><Button variant="primary" size="lg">
          Add Property
        </Button></a></Container>
        <br/>
      {/* <input type = 'search' placeholder='Search Property' /> */}
      <Container className="search">
        <Search property={property} />
      </Container>
    </div>
    );
  }

export default MyProperty
