import React, { Component } from "react";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuExpert from "../../components/MenuExpert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";

// page content
const pageTitle = "Expertire - Timeline";
const pageDescription = "Welcome to Expertire";

function postsList() {
  return axios
    .get("/posts/fetch")
    .then(function (results) {
      return results.data;
    })
    .catch((error) => {});
}

class TimelineExpert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userRole: "",
      userId: "",
      postsObj: [],
    };
  }
  InterestedHandler = (event) => {
    event.preventDefault();
    console.table("Onclickid" + event.target.id, event.target.value);

    const instituteId = event.target.value;
    const postId = event.target.id;

    const data = {
      instituteId: instituteId,
      postId: postId,
    };
    const conf = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post("/request", data, conf)
      .then((response) => {
        Swal.fire("Request Sent!!");
      })
      .catch((error) => {
        Swal.fire("Something Went Wrong Try Again!!!!");
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

    postsList().then((res) => {
      console.log(res);
      this.setState({
        postsObj: res,
      });
    });
  }

  render() {
    return (
      <div>
        <Meta title={pageTitle} />
        <Header
          // head={pageTitle}
          description="Timeline"
          style={{ align: "left" }}
        />
        <MenuExpert></MenuExpert>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="12">
              {this.state.postsObj.map((r) => (
                <Card className="mb-3" key={r._id} id={r._id}>
                  <Card.Header>{r.institute.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>{r.title}</Card.Title>
                    <Card.Text>{r.message}</Card.Text>
                    <div style={{ float: "right" }}>
                      <Button
                        id={r._id}
                        className="mx-2"
                        variant="secondary"
                        onClick={() => {
                          window.location.href =
                            "/institute/profile/" + r.instituteId;
                          // window.location.href =
                          //   "/institute/profile/" + r.instituteId;
                        }}
                      >
                        View Institute
                      </Button>
                      <Button
                        id={r._id}
                        value={r.instituteId}
                        onClick={this.InterestedHandler}
                        className="mx-2"
                        variant="primary"
                      >
                        I'm Interested
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              {/* <Card>
                <Card.Header>Sponsored Post</Card.Header>
                <Card.Body>
                  <Card.Title>Post Title</Card.Title>
                  <Card.Text>Message body here</Card.Text>
                  <Button style={{ float: "right" }} variant="primary">
                    Interested
                  </Button>
                </Card.Body>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TimelineExpert;
