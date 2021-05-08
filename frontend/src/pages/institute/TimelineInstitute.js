import React, { Component } from "react";
import Header from "../../components/Header";
import Meta from "../../components/Meta";
import MenuInstitute from "../../components/MenuInstitute";
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
  var token = Cookies.get("auth_token");
  return axios
    .get("/posts/fetch")
    .then(function (results) {
      return results.data;
    })
    .catch((error) => {});
}

class TimeLineInstitute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userRole: "",
      userId: "",
      postTitle: "",
      postBody: "",
      postsObj: [],
      postStatus: "Post",
    };
  }
  SubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    console.log("new post", this.state.postTitle, this.state.postBody);

    const data = {
      title: this.state.postTitle,
      message: this.state.postBody,
    };
    const conf = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .post("/posts/createpost", data, conf)
      .then((response) => {
        Swal.fire("Posted Successfully!!!");
        // window.location.reload();
        window.setTimeout(function () {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        Swal.fire("Error Creating Post!!!!!");
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
    if (role != "institute") {
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
      console.log(this.state.userId);
      var i;
      var specificPosts = [];
      for (i = 0; i < res.length; i++) {
        if (res[i].instituteId == this.state.userId) {
          specificPosts.push(res[i]);
        }
      }
      this.setState({
        postsObj: specificPosts,
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

        <MenuInstitute></MenuInstitute>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="12">
              <Card className="mb-3">
                <Card.Header>Create a new posting</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.SubmitHandler}>
                    <Form.Group controlId="NewPostTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="input"
                        name="postTitle"
                        placeholder="Enter the title for the posting"
                        required
                        minLength="10"
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="NewPostTextArea">
                      <Form.Label>Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        minLength="15"
                        name="postBody"
                        placeholder="write your message here ..."
                        required
                        onChange={this.HandleChange}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      style={{ float: "right" }}
                      variant="primary"
                    >
                      Post
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {this.state.postsObj.map((r, index) => (
                <Card className="mb-3" key={r._id} id={r._id}>
                  <Card.Header>{index + 1}</Card.Header>
                  <Card.Body>
                    <Card.Title>{r.title}</Card.Title>
                    <Card.Text>{r.message}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TimeLineInstitute;
