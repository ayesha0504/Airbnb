import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from "react-bootstrap";
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: null, fields: {}, errors: {}};
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Please enter your name";
        }

        const validName = new RegExp(
            '^[a-zA-Z ]+$'
        );
        if (typeof fields["name"] !== "undefined") {
            if (!validName.test(fields["name"])) {
                formIsValid = false;
                errors["name"] = "Name should only contain letters or a space";
            }
        }

        //Username 
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Please enter your username";
        }

        const validusername = new RegExp(
            '^[a-zA-Z0-9!@#$%^&*]+$'
        );
        if (typeof fields["username"] !== "undefined") {
            if (!validusername.test(fields["username"])) {
                formIsValid = false;
                errors["username"] = "User name can contain uppercase, lower case letters, digits and special characters like !,@,#,$,%,^,&,*";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Please enter your email address";
        }

        const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        if (typeof fields["email"] !== "undefined") {
            if (!validEmail.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }


        //Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Please enter your password"
        }

        const validPassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$');
        if (typeof fields["password"] !== "undefined") {
            if (!validPassword.test(fields["password"])) {
                formIsValid = false;
                errors["password"] = "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and must be 8-15 characters long";
            }
        }

        //Confirm password
        if (!fields["confirmpassword"]) {
            formIsValid = false;
            errors["confirmpassword"] = "Please enter your confirm password"
        }

        if (typeof fields["password"] !== "undefined" && typeof fields["confirmpassword"] !== "undefined") {

            if (fields["password"] != fields["confirmpassword"]) {
                formIsValid = false;
                errors["confirmpassword"] = "Passwords don't match.";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
              

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleForm(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    
    handleSubmit(e) {
        e.preventDefault();

        if (!this.handleValidation()) {
            alert("Form has errors.");
        } else {
                fetch('/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({  // you will get user information from login form

                        "username": this.state.fields["username"],
                        "email": this.state.fields["email"],
                        "password": this.state.fields["password"],
                        "name" : this.state.fields["name"],
                        "userType":this.state.value,

                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                            alert(data.message);
                        } )
                    .catch((error) => {
                        console.log(error.message);})
        }
    }
    render(){
        return (
            <div>
            <Container>
            <Form className='signup' onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="name" placeholder="Enter Name" onChange={this.handleForm.bind(this, "name")} value={this.state.fields["name"]} />
                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" id="username" placeholder="Enter User Name" onChange={this.handleForm.bind(this, "username")} value={this.state.fields["username"]} />
                <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleForm.bind(this, "email")} value={this.state.fields["email"]} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleForm.bind(this, "password")} value={this.state.fields["password"]} />
                <Form.Text className="text-muted">
                Enter a password that contain at least one lowercase letter, one uppercase letter, one digit, one special character and must be 8-15 characters long
                </Form.Text>
                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" id="confirmpassword" placeholder="Confirm Password" onChange={this.handleForm.bind(this, "confirmpassword")} value={this.state.fields["confirmpassword"]} />
                <span style={{ color: "red" }}>{this.state.errors["confirmpassword"]}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicType">
                <Form.Label>Select User Type</Form.Label>
                <Form.Select id="value" value={this.state.value} onChange={this.handleChange.bind(this)}>
                <option value="user">User</option>
                <option value="host">Host</option>
                </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br />
            </Container>
            </div>
);
}
}
export default SignUp;