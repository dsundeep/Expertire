import React, { Component } from "react";
import Header from "../components/Header";
import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Swal from "sweetalert2";

// page content
const pageTitle = "Signup";
const pageDescription = "Welcome to Expertire";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      role: "institute",
    };
  }
  SubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    console.log("role", this.state.role, this.state.email, this.state.password);

    if (this.state.password === this.state.confirmpassword) {
      //true
      console.log("correct password");
      const data = {
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      };
      const conf = {
        headers: {
          "content-type": "application/json",
        },
      };
      axios
        .post("/users/create", data, conf)
        .then((response) => {
          console.log(response.data.toString());
          if (
            response.data.toString() ==
              "institute account created successfully" ||
            response.data.toString() == "expert account created successfully" ||
            response.data.toString() ==
              "Institute account created successfully" ||
            response.data.toString() == "Expert account created successfully"
          ) {
            Swal.fire("Account Creation Successful!! Please Login");

            window.setTimeout(function () {
              window.location.href = "/login";
            }, 3000);
          } else {
            Swal.fire("Error Try Signup Again!!!");
          }
        })
        .catch((error) => {});
    } else {
      alert("Passwords do not Match!!!!!");
    }
  };
  HandleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription} />
        <Menu></Menu>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="6">
              <Form onSubmit={this.SubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                    onChange={this.HandleChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    // minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Password Validation Error!!! must contain at least one number and one uppercase and lowercase letter, and minimum length is 8 characters"
                    required
                    onChange={this.HandleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    minLength="8"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Password Validation Error!!! must contain at least one number and one uppercase and lowercase letter, and minimum length is 8 characters"
                    onChange={this.HandleChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    size="lg"
                    custom
                    name="role"
                    id="role"
                    required
                    onChange={this.HandleChange}
                  >
                    <option value="institute">Institute</option>
                    <option value="expert">Expert</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I Agree to the Terms & Conditions"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
