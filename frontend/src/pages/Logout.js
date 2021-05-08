import React, { Component } from "react";

import axios from "axios";
import Swal from "sweetalert2";

class Logout extends Component {
  componentDidMount() {
    axios
      .get("/users/logout")
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {});
  }

  render() {
    return <div></div>;
  }
}

export default Logout;
