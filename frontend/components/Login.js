//import React, { Component } from 'react';
import { useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from "react-bootstrap";
import 'jquery/dist/jquery.min.js';

import React, {useState} from 'react';
function Login() {
    const [state , setState] = useState({
        email : "",
        password : ""
    })
    const nav=useNavigate();
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({  // you will get user information from login form

                "email": state.email,
                "password": state.password,

            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                if (typeof data.token === "undefined") {
                    alert(data.message);
                } else {
                    let inMemoryToken = data.token;
                    console.log(inMemoryToken);
                    //this.setState({loginId : data._id});
                    localStorage.setItem('token', inMemoryToken);
                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage.setItem('userType', JSON.stringify(data.userType));
                    localStorage.setItem('username', JSON.stringify(data.username));
                    nav("/ ");
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    return(
      <Container className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
      <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
      
      <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
          >
                    Register
          </button>
        </Container>
  )
}

/*function Redirect() {
    const navigation = useNavigate();
    console.log("reached")
    return (
         <div>
            
          navigation("/");
          </div>
    );
  }

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { fields : {}};
    }
    

    handleForm(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
         

    handleSubmit(e) {
        e.preventDefault();
            fetch('/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({  // you will get user information from login form

                    "email": this.state.fields["email"],
                    "password": this.state.fields["password"],

                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    if (typeof data.token === "undefined") {
                        alert(data.message);
                    } else {
                        let inMemoryToken = data.token;
                        console.log(inMemoryToken);
                        //this.setState({loginId : data._id});
                        localStorage.setItem('token', inMemoryToken);
                        localStorage.setItem('user', JSON.stringify(data));
                        localStorage.setItem('userType', JSON.stringify(data.userType));
                        alert('Login successful');
                        this.state.fields["redirect"]=true;
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

    render() {
        
        return (
            <Container>
                <Form className='signup' onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleForm.bind(this, "email")} value={this.state.fields["email"]} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleForm.bind(this, "password")} value={this.state.fields["password"]} />
                </Form.Group>
                    
                <Button variant="primary" type="submit">
                    Submit
                </Button>

                </Form>

            </Container>
        )
    }

}*/

export default Login;