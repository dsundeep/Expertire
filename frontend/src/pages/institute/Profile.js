import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuInstitute from "../../components/MenuInstitute";
import MenuExpert from "../../components/MenuExpert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import NotFound from "../NotFound";

// page content
const pageTitle = "Institute Profile";
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userRole: "",
      userId: "",
      profileObj: [],
    };
  }

  componentDidMount() {
    let userid = null;

    if (this.props.match.params.userId) {
      userid = this.props.match.params.userId;
      this.setState({
        userId: userid,
        owner: false,
      });
    } else {
      var token = Cookies.get("auth_token");
      if (token === "" || token === undefined || token === null) {
        this.props.history.push("/");
      }

      userid = localStorage.getItem("userid");
      this.setState({
        userId: userid,
        owner: true,
      });
    }

    if (userid != null) {
      getProfile(userid).then((res) => {
        this.setState({
          profileObj: res,
        });
      });
    }
  }

  render() {
    if (this.state.profileObj.role == "institute") {
      return (
        <div>
          <Meta title={pageTitle} />
          <Container className="mt-5">
            {localStorage.getItem("role") == "expert" ? (
              <MenuExpert></MenuExpert>
            ) : (
              <MenuInstitute></MenuInstitute>
            )}
            <Row className="justify-content-center">
              <Col md="8">
                <Card className="my-3">
                  <Card.Header>
                    <h5>{this.state.profileObj.name ?? "Name"}</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="my-2">
                      <h5>Address</h5>
                      <p>
                        {this.state.profileObj.address ?? "Street Address"}{" "}
                        <br />
                        {this.state.profileObj.city ?? "City"},{" "}
                        {this.state.profileObj.province ?? "Province"},{" "}
                        {this.state.profileObj.country ?? "Country"}
                      </p>
                    </div>

                    <div className="my-2">
                      <h5>About us</h5>
                      <p>{this.state.profileObj.about ?? "N/A"}</p>
                    </div>
                  </Card.Body>
                  {this.state.owner && (
                    <Card.Footer>
                      <LinkContainer to="/institute/profile/edit">
                        <Button>Edit Profile</Button>
                      </LinkContainer>
                    </Card.Footer>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

export default Profile;
