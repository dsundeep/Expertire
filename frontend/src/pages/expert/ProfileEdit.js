import React, { Component } from "react";

import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuExpert from "../../components/MenuExpert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

// page content
const pageTitle = "Edit Expert Profile";
const pageDescription = "";

function getProfile(userId) {
  var token = Cookies.get("auth_token");
  return axios
    .get("/users/userprofile", { params: { userId: userId } })
    .then(function (res) {
      return res.data;
    })
    .catch((error) => {});
}

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userRole: "",
      userId: "",
      profileObj: [],
    };
  }

  SubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      province: this.state.province,
      country: this.state.country,
      skills: this.state.skills,
      experiences: this.state.experiences,
      talks: this.state.talks,
      workshops: this.state.workshops,
    };
    const conf = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .patch("/users/update", data, conf)
      .then((response) => {
        Swal.fire("Profile Updated!!!");
        window.setTimeout(function () {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        Swal.fire("Error Updating Profile!!!");
      });
  };
  HandleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    var token = Cookies.get("auth_token");
    if (token === "" || token === undefined || token === null) {
      this.props.history.push("/");
    }

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const userid = localStorage.getItem("userid");
    if (role != "expert") {
      Swal.fire("Insufficient Access Rights!! Invalid Account Type");
      this.props.history.push("/");
    }
    this.setState({
      userEmail: email,
      userRole: role,
      userId: userid,
    });

    getProfile(userid).then((res) => {
      console.log(res);
      this.setState({
        profileObj: res,
      });
    });
  }

  render() {
    return (
      <div>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription} />
        <MenuExpert></MenuExpert>
        <Container className="mt-5">
          <Form onSubmit={this.SubmitHandler}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        defaultValue={this.state.profileObj.firstName}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLasttName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        defaultValue={this.state.profileObj.lastName}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="address"
                        defaultValue={this.state.profileObj.address}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        defaultValue={this.state.profileObj.city}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Control
                        type="text"
                        name="province"
                        defaultValue={this.state.profileObj.province}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        defaultValue={this.state.profileObj.country}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formAbout">
                      <Form.Label>Skills</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="skills"
                        defaultValue={this.state.profileObj.skills}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formAbout">
                      <Form.Label>Experiences</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="experiences"
                        defaultValue={this.state.profileObj.experiences}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formAbout">
                      <Form.Label>Talks</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="talks"
                        defaultValue={this.state.profileObj.talks}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formAbout">
                      <Form.Label>Workshops</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="workshops"
                        defaultValue={this.state.profileObj.workshops}
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ProfileEdit;
