import Header from "../components/Header";
import React, { Component } from "react";
import Meta from "../components/Meta";
import Menu from "../components/Menu";

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image1 from "../images/photo_bala.png";
import Image2 from "../images/photo_harry.jpeg";
import Image3 from "../images/photo_prashant.jpeg";
import Image4 from "../images/photo_vishal.jpeg";
import Image5 from "../images/photo_yash.jpg";

const About = () => {
  // page content
  const pageTitle = "About us";
  const pageDescription = "Meet our Team";

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      <Menu></Menu>
      <Container>
        <CardDeck>
          <Card>
            <div className="content-center" style={{ height: "250px" }}>
              {" "}
              <Card.Img className="align-middle" variant="top" src={Image1} />
            </div>

            <Card.Body>
              <Card.Title>Bala Sundeep</Card.Title>
              <Card.Text>
                <h3 className="lead">Avid Thinker</h3>
                Backend Developer
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className="content-center" style={{ height: "250px" }}>
              <Card.Img className="align-middle" variant="top" src={Image2} />
            </div>
            <Card.Body>
              <Card.Title>Harry Ben Alex</Card.Title>
              <Card.Text>
                <h3 className="lead">Ninja</h3>
                Frontend Developer
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className="content-center" style={{ height: "250px" }}>
              <Card.Img className="align-middle" variant="top" src={Image3} />
            </div>
            <Card.Body>
              <Card.Title>Prashant Sarvi</Card.Title>
              <Card.Text>
                <h3 className="lead">Ninja</h3>
                Frontend Developer
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className="content-center" style={{ height: "250px" }}>
              <Card.Img className="align-middle" variant="top" src={Image4} />
            </div>
            <Card.Body>
              <Card.Title>Vishal Sancheti</Card.Title>
              <Card.Text>
                <h3 className="lead">Innovator</h3>
                Full-stack Developer
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <div className="content-center" style={{ height: "250px" }}>
              <Card.Img className="align-middle" variant="top" src={Image5} />
            </div>
            <Card.Body>
              <Card.Title>Yash Jaiswal</Card.Title>
              <Card.Text>
                <h3 className="lead">Geek</h3>
                Full-stack Developer
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
};

export default About;
