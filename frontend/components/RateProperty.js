import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

function RateProperty() {
const [state , setState] = useState({
    comments : "",
    rating: ""
    
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
    fetch(`/ratings/${params.property_id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({  // you will get user information from login form

            "comments": state.comments,
            "ratings": state.ratings,
            "username":JSON.parse(localStorage.getItem('username')),


        })
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        if (typeof data.token === "undefined") {
            alert(data.message);
        } else {
            alert(data.message);
            
        }
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
      Comments
    </Form.Label>
    <Col sm="10">
    <Form.Control type="text" id="comments" placeholder="Please enter your comments"  onChange={handleChange} value={state.comments} />
    </Col>
  </Form.Group>


  <Form.Group as={Row} className="mb-3" controlId="formBasicType">
<Form.Label column sm="2">Rating</Form.Label>
<Col sm="10">
<Form.Select id="ratings" onChange={handleChange} value={state.ratings}>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</Form.Select>
</Col>
</Form.Group>
  <Button variant="primary" type="submit" onClick={handleSubmitClick}>
                Submit
  </Button>
</Form>
</Container>
)
}

export default RateProperty