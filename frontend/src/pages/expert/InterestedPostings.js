import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuExpert from "../../components/MenuExpert";

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const InterestedPostings = () => {
  // page content
  const [experts, setExperts] = useState([]);

  const cancelBookingHandler = (event) => {
    console.log("INSIDECANCELBOOKINGHANDELER");
    console.log(event.target.id);
    axios
      .get("/request/delete?requestId=" + event.target.id)
      .then((response) => {
        Swal.fire("Deleted request successfully!!!");
        // window.location.reload();
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        Swal.fire("Error Deleting!!!!");
      });
  };
  var token = Cookies.get("auth_token");
  if (token === "" || token === undefined || token === null) {
    Swal.fire("Insufficient Access Rights!! Invalid Account Type");
    window.location.href = "/";
  }
  const role = localStorage.getItem("role");
  if (role != "expert") {
    Swal.fire("Insufficient Access Rights!! Invalid Account Type");
    window.location.href = "/";
  }
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    axios.get(`/request/getByExpert?expertId=${userId}`).then((response) => {
      const expertsList = response.data;
      console.log(expertsList);
      setExperts(expertsList);
    });
  }, []);
  const pageTitle = "Interested Posts";

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} />
      <MenuExpert></MenuExpert>
      <Container>
        <Row className="justify-content-md-center">
          {experts && experts.length == 0
            ? "No Interested Posts Available!!"
            : experts &&
              experts.length &&
              experts.map((expert, index) => (
                <Col xs lg="12" key={index}>
                  <div className="card mb-3">
                    <div className="card-header">
                      Post by {expert.institute && expert.institute.name}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {expert.post && expert.post.title}
                      </h5>
                      <p className="card-text">
                        {expert.post && expert.post.message}
                      </p>
                      <div style={{ float: "right" }}>
                        <LinkContainer
                          to={"/institute/profile/" + expert.institute._id}
                        >
                          <button className="btn btn-primary mr-2">
                            View Institute
                          </button>
                        </LinkContainer>

                        <button
                          className="btn btn-secondary"
                          id={expert._id}
                          onClick={cancelBookingHandler}
                        >
                          Cancel
                        </button>
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

export default InterestedPostings;
