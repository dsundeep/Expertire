import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuInstitute from "../../components/MenuInstitute";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const InterestedExperts = () => {
  // page content

  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    var token = Cookies.get("auth_token");
    if (token === "" || token === undefined || token === null) {
      Swal.fire("Insufficient Access Rights!! Invalid Account Type");
      window.location.href = "/";
    }
    const role = localStorage.getItem("role");
    if (role != "institute") {
      Swal.fire("Insufficient Access Rights!! Invalid Account Type");
      window.location.href = "/";
    }
    //tillhere
    // console.log(userid);
    axios
      .get(`/request/getByInstitute?instituteId=${userId}`)
      .then((response) => {
        const expertsList = response.data;
        console.log(expertsList);
        setExperts(expertsList);
      });
  }, []);
  const pageTitle = "Interested Experts";
  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} />
      <MenuInstitute></MenuInstitute>
      <Container>
        <Row className="justify-content-md-center">
          {experts && experts.length == 0
            ? "No Requests Available"
            : experts.length &&
              experts.map((expert, index) => (
                <Col xs lg="12" key={index}>
                  <div className="card mb-3">
                    <div className="card-header">
                      {" "}
                      Post Title - {expert.post && expert.post.title}
                    </div>
                    <div className="card-body">
                      <p className="card-title">
                        Post Message - {expert.post && expert.post.message}
                      </p>
                      <h5 className="card-text">
                        Expert Interested -{" "}
                        {expert.expert &&
                          (expert.expert.firstName || expert.expert.email)}
                      </h5>
                      <div style={{ float: "right" }}>
                        <LinkContainer
                          to={"/expert/profile/" + expert.expert._id}
                        >
                          <button className="btn btn-primary mr-2">
                            View Expert
                          </button>
                        </LinkContainer>

                        {/*add mailto to email*/}
                        <a
                          className="btn btn-primary"
                          href={"mailto:" + expert.expert.email}
                        >
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  );
};

export default InterestedExperts;
