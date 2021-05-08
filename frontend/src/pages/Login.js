import React, { Component } from "react";

import Header from "../components/Header";
import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Swal from "sweetalert2";

// page content
const pageTitle = "Login";
const pageDescription = "Welcome to Expertire";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  SubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    console.log("role", this.state.email, this.state.password);

    const dataObj = {
      email: this.state.email,
      password: this.state.password,
    };
    const conf = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post("/users/login", dataObj, conf)
      .then((response) => {
        console.table(response);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("userObj", response.data.user);
        localStorage.setItem("userid", response.data.user._id);
        console.log("rolehere" + response.data.user.role);
        if (response.data.user.role == "expert") {
          if (typeof response.data.user.firstName != "undefined") {
            Swal.fire("Login Success!");
            this.props.history.push("/expert/timeline");
          } else {
            this.props.history.push("expert/profile/edit"); //editprofileifnewuser
          }
        } else if (response.data.user.role == "institute") {
          if (typeof response.data.user.name != "undefined") {
            Swal.fire("Login Success!");
            this.props.history.push("/institute/timeline");
          } else {
            this.props.history.push("institute/profile/edit"); //editprofileifnewuser
          }
        }
      })
      .catch((error, response) => {
        Swal.fire("Invalid Email or Credentials!!!");
      });
  };
  HandleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Meta title="Expertire - Login" />
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
                    name="password"
                    placeholder="Password"
                    required
                    minLength="8"
                    onChange={this.HandleChange}
                  />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
