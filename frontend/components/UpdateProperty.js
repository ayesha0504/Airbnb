import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

function UpdateProperty() {
const [state , setState] = useState({
    title : "",
    location : "",
    description : "",
    price : "",
    bedrooms : "",
    amenities : "",
    cleaning_fee : "",
    category:"",
    img1:""
})
const params =useParams();
console.log(params.property_id);
console.log("not coming");


const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}
const handleSubmitClick = (e) => {
    e.preventDefault();
    fetch(`/properties/${params.property_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({  // you will get user information from login form

          "title" : state.title,
          "location" : state.location,
          "description" : state.description,
          "price" : state.price,
          "bedrooms" : state.bedrooms,
          "amenities" : state.amenities,
          "property_id" : params.property_id,
          "cleaning_fee" : state.cleaning_fee,
          "category":state.category,
          "img1":state.img1,
          "username":JSON.parse(localStorage.getItem('username'))

        })
    })
        .then(res => res.json())
        .then((data) => {
            
                alert(data.message);
         
        })
        .catch((error) => {
            console.log(error.message);
        });
}
  return (
    <Container style={{marginTop:"35px"}}>
        <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="title" placeholder="Enter title" onChange={handleChange} value={state.title} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Location
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="location" placeholder="Enter Location" onChange={handleChange} value={state.location} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBasicType">
    <Form.Label column sm="2">Select Category</Form.Label>
    <Col sm="10">
    <Form.Select id="category" value={state.category} onChange={handleChange}>
    <option value="Cabin">Cabin</option>
    <option value="Tiny house">Tiny House</option>
    <option value="Islands">Islands</option>
    <option value="Lakefront">LakeFront</option>
    </Form.Select>
    </Col>
    </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="description" placeholder="Enter Description" onChange={handleChange} value={state.description} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Price
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="price" placeholder="Enter price" onChange={handleChange} value={state.price} />
        </Col>
        <Form.Text className="text-muted">
                Example: $500
        </Form.Text>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Bedrooms
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="bedrooms" placeholder="Enter # of bedrooms" onChange={handleChange} value={state.bedrooms} />
        </Col>
        <Form.Text className="text-muted">
                Example: 2 bedrooms, 3 bath
        </Form.Text>
      </Form.Group>
      

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Amenitites
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="amenities" placeholder="Enter list of amenities" onChange={handleChange} value={state.amenities} />
        </Col>
        <Form.Text className="text-muted">
                Example: Kitchen, Wifi, Free Parking 
        </Form.Text>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Cleaning Fee
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" id="cleaning_fee" placeholder="Enter Cleaning fee per hour" onChange={handleChange} value={state.cleaning_fee} />
        </Col>
        <Form.Text className="text-muted">
                Example: $125 
        </Form.Text>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Upload Images
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file" onChange={handleChange} value={state.img1} />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmitClick}>
                    Submit
      </Button>
    </Form>
    </Container>
  )
}

export default UpdateProperty;