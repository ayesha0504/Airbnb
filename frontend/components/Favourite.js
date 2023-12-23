
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container, Card, CardImg, Carousel, Button } from "react-bootstrap";

function Cardrow({ property, onSelect }) {
  const handleSubmitClick = (e) => {
    e.preventDefault();
    fetch(`/favourites/${property.property_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'username': JSON.parse(localStorage.getItem('username'))
    }
  })
    
        .then(() => {
            alert('delete successful');
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error.message);
        });
  }
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
          {/* <Button
            onClick={() => {
              onSelect(true);
            }}
          >
            {" "}
            test
          </Button> */}
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
        <Card.Text style={{ textAlign: "center" }}>{property.price}</Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          {property.description}
        </Card.Text>
        <Card.Text>
        <Button variant="primary" onClick={handleSubmitClick} style={{margin:'5px'}}>Delete</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function Table({ property, testFunc }) {
  const rows = [];
  property.forEach((property) => {
    rows.push(
      <Cardrow key={property.title} property={property} onSelect={testFunc} />
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
  }, [props]);

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
    <Container>
      <input
        type="search"
        placeholder="Search"
        value={props.filterVal}
        onInput={(e) => handleFilter(e)}
        style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginLeft:"auto", marginRight:'auto'}}
        
      />

      <Container className="Table">
        
          <Table property={data} testFunc={setSelectedProp} />
        
      </Container>
    </Container>
  );
}

function Favourite() {
  const [property, setProperty] = useState([]);
  useEffect( () => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    console.log(localStorage.getItem('username'));
    const data = await fetch("/favourites", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'username': JSON.parse(localStorage.getItem('username'))
      }
  });
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

export default Favourite





