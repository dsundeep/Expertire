import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";

import Footer from "./components/Footer";

import HomePage from "./pages/Home.js";
import AboutPage from "./pages/About.js";
import SignupPage from "./pages/Signup.js";
import LoginPage from "./pages/Login.js";
import NotFoundPage from "./pages/NotFound.js";
import TimelineExpert from "./pages/expert/TimelineExpert";
import TimeLineInstitute from "./pages/institute/TimelineInstitute";
import ExpertProfilePage from "./pages/expert/Profile.js";
import ExpertProfileEditPage from "./pages/expert/ProfileEdit.js";
import InstituteProfilePage from "./pages/institute/Profile.js";
import InstituteProfileEditPage from "./pages/institute/ProfileEdit.js";
import InterestedPostings from "./pages/expert/InterestedPostings";
import InterestedExperts from "./pages/institute/InterestedExperts";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

/*Bootstrap*/
import Container from "react-bootstrap/Container";

import "./styles/custom.css";

const validateAuth = (Component) => () => {
  return Cookies.get("auth_token") ? <Component /> : <Redirect to="/login" />;
};

const App = () => (
  <Router>
    <main className="my-5 pt-3" style={{ minHeight: "80vh" }}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/expert/timeline" component={TimelineExpert} />
        <Route path="/institute/timeline" component={TimeLineInstitute} />
        <Route
          path="/expert/profile/edit"
          component={ExpertProfileEditPage}
          exact
        />
        <Route path="/expert/profile/:userId?" component={ExpertProfilePage} />
        <Route
          path="/institute/profile/edit"
          component={InstituteProfileEditPage}
          exact
        />
        <Route
          path="/institute/profile/:userId?"
          component={InstituteProfilePage}
        />
        <Route path="/expert/interested/posts" component={InterestedPostings} />
        <Route path="/institute/requests/posts" component={InterestedExperts} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
    <Footer />
  </Router>
);

export default App;
