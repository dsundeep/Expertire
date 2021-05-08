import Meta from '../components/Meta'
import Hero from "../components/Hero";
import React, { Component }  from 'react';
import Header from "../components/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import registerIllustration from "../images/undraw_personal_information_re_vw8a.svg";
import postIllustration from "../images/undraw_online_ad_re_ol62.svg";
import doneIllustration from "../images/undraw_Powerful_re_frhr.svg";

import featureIcon from "../images/star.png";
import Menu from "../components/Menu";


const Home = () => {
    // page content
    const pageTitle = 'Home'
    const pageDescription = 'welcome to react bootstrap template'

    return (
        <div>
            <Meta title={pageTitle}/>
            <Menu></Menu>
            <Hero
                heading="EXPERTIRE"
                paragraph="Connecting Institutes and Experts"
                button="Get Started"
            />
            <Container>
                <Header head={"Why Expertire?"} description={""}/>
                <Row>
                    <Col lg="4" className="text-center">
                        <Image fluid roundedCircle src={featureIcon} width="100px" className="mb-2"/>
                        <h3>Trusted Institute</h3>
                        <p>We strictly only on-board Institutes that are genuine.</p>
                    </Col>
                    <Col lg="4" className="text-center">
                        <Image fluid roundedCircle src={featureIcon} width="100px" className="mb-2"/>
                        <h3>Helping Expert</h3>
                        <p>We encourage only self motivated experts.</p>
                    </Col>
                    <Col lg="4" className="text-center">
                        <Image fluid roundedCircle src={featureIcon} width="100px" className="mb-2"/>
                        <h3>24/7 Support</h3>
                        <p>We are 24/7 available on mail for support.</p>
                    </Col>
                </Row>
            </Container>
            <hr/>
            <Container>
                <Header head={"How it Works?"} description={""}/>
                <Row>
                    <Col lg="6">
                        <h2 className="mt-5">
                            Get Started. <span className="text-muted">Register and Login.</span>
                        </h2>
                        <p className="lead">
                            Easily on-board with simple information and start posting.
                        </p>
                    </Col>
                    <Col lg="6">
                        <Image fluid src={registerIllustration}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" className="order-lg-2">
                        <h2 className="mt-5">
                            Post or Respond. <span className="text-muted">Booking Requirements.</span>
                        </h2>
                        <p className="lead">
                            Quickly post requirements or respond to posts that interests you.
                        </p>
                    </Col>
                    <Col lg="6" className="order-lg-1">
                        <Image fluid src={postIllustration}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <h2 className="mt-5">
                            Confirm Booking. <span className="text-muted">Done.</span>
                        </h2>
                        <p className="lead">
                            Once you get your desired expert's interest just contact them and confirm booking.
                        </p>
                    </Col>
                    <Col lg="6">
                        <Image fluid src={doneIllustration}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
