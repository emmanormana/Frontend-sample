import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./components/toppanelroutes/home/Home";
import Events from "./components/toppanelroutes/events/Events";
import EventsPreview from "./components/toppanelroutes/events/EventsPreview";
import News from "./components/toppanelroutes/home/News";
import Blogs from "./components/toppanelroutes/blog/Blog";
import BlogComment from "./components/toppanelroutes/blog/BlogComment";
import BlogSyndication from "./components/toppanelroutes/blog/BlogSyndication";
import AboutUs from "./components/toppanelroutes/about/AboutUs";
import Projects from "./components/toppanelroutes/projects/Projects";
import ContactUs from "./components/toppanelroutes/contact/ContactUs";
import Research from "./components/toppanelroutes/research/Research";
import Faq from "./components/toppanelroutes/faq/Faq";
import Help from "./components/toppanelroutes/help/Help";
import NetworkMembers from "./components/toppanelroutes/networkmembers/NetworkMembers";
import Reports from "./components/toppanelroutes/reports/Reports";
import Registration from "./components/user/Registration";
import PersonList from "./components/user/PersonList";
import Links from "./components/toppanelroutes/links/Links";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import ConfirmationEmail from "./components/user/ConfirmationEmail";
import Profile from "./components/user/Profile";
import ProfileUserContact from "./components/user/ProfileUserContact";
import ProfileProject from "./components/user/ProfileProject";
import ProfileSetting from "./components/user/ProfileSetting";
import ProfileOverall from "./components/user/ProfileOverAll";
import ProfileAddSocialMedia from "./components/user/ProfileAddSocialMedia";
import MessengerApp from "./components/messenger/MessengerApp";
import Maps from "./components/toppanelroutes/home/Maps";
import ResetPassword from "./components/user/ResetPassword";
import ResetPassConfirmation from "./components/user/ResetPassConfirmation";
import ForgotPassword from "./components/user/ForgotPassword";
//Placeholder menu, overwrite navigation options on live project
import NotFoundPage from "../src/components/navigation/PageNotFound";
import UnAuthorizedPage from "../src/components/navigation/Unauthorized";

// Test Authentication
import RequireRoleBase, {
  RequireRole
} from "../src/components/navigation/RequireRole";
import HasRole, { IsAdmin, IsUser } from "../src/components/navigation/HasRole";
import PrivateRoute from "./components/navigation/RoleAuthentication";

const Routes = props => (
  <Router>
    <header id="js-header" className="u-header">
      <div className="u-header__section">
        <div className="g-bg-main">
          <div className="container g-py-5">
            <ul className="list-inline d-flex align-items-center g-mb-0">
              <li className="list-inline-item d-none d-lg-inline-block">
                <Link
                  className="u-link-v5 g-brd-around g-brd-white-opacity-0_2 g-color-white-opacity-0_7 g-color-white--hover g-font-size-12 g-rounded-20 text-uppercase g-px-20 g-py-10"
                  to="/aboutus"
                >
                  About Us
                </Link>}
              </li>
              {/* Language */}
              <li className="list-inline-item g-pos-rel ml-lg-auto">
                <Link
                  id="language-dropdown-invoker"
                  className="d-none d-sm-flex align-items-center u-link-v5 g-color-white-opacity-0_7 g-color-white--hover g-font-size-12 text-uppercase g-pl-0 g-pl-10--lg g-pr-10 g-py-15"
                  to="/"
                  aria-controls="language-dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-dropdown-event="hover"
                  data-dropdown-target="#language-dropdown"
                  data-dropdown-type="css-animation"
                  data-dropdown-duration="0"
                  data-dropdown-hide-on-scroll="true"
                  data-dropdown-animation-in="fadeIn"
                  data-dropdown-animation-out="fadeOut"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="11"
                    width="27"
                    viewBox="0 0 640 480"
                  >
                    <defs>
                      <clipPath id="a">
                        <path
                          fillOpacity=".67"
                          d="M-85.333 0h682.67v512h-682.67z"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#a)" transform="translate(80) scale(.94)">
                      <g strokeWidth="1pt">
                        <path fill="#006" d="M-256 0H768.02v512.01H-256z" />
                        <path
                          d="M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z"
                          fill="#fff"
                        />
                        <path
                          d="M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z"
                          fill="#fff"
                        />
                        <path
                          d="M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z"
                          fill="#c00"
                        />
                      </g>
                    </g>
                  </svg>
                  English
                  <i className="g-ml-3 fa fa-angle-down" />
                </Link>
                <ul
                  id="language-dropdown"
                  className="list-unstyled u-shadow-v39 g-brd-around g-brd-4 g-brd-white g-bg-secondary g-pos-abs g-left-0 g-z-index-99 g-mt-5"
                  aria-labelledby="language-dropdown-invoker"
                >
                  <li className="dropdown-item g-brd-bottom g-brd-2 g-brd-white g-px-0 g-py-2">
                    <Link
                      className="nav-link d-flex align-items-center g-color-main g-color-primary--hover g-bg-secondary-dark-v2--hover g-font-size-default"
                      to="/"
                    >
                      <svg
                        className="mr-1 g-ml-minus-10"
                        xmlns="http://www.w3.org/2000/svg"
                        height="11"
                        width="27"
                        viewBox="0 0 640 480"
                      >
                        <defs>
                          <clipPath id="b">
                            <path
                              fillOpacity=".67"
                              d="M-85.333 0h682.67v512h-682.67z"
                            />
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#b)"
                          transform="translate(80) scale(.94)"
                        >
                          <g strokeWidth="1pt">
                            <path fill="#006" d="M-256 0H768.02v512.01H-256z" />
                            <path
                              d="M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z"
                              fill="#fff"
                            />
                            <path
                              d="M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z"
                              fill="#fff"
                            />
                            <path
                              d="M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z"
                              fill="#c00"
                            />
                          </g>
                        </g>
                      </svg>
                      English
                    </Link>
                  </li>
                  <li className="dropdown-item g-px-0 g-py-2">
                    <Link
                      className="nav-link d-flex align-items-center g-color-main g-color-primary--hover g-bg-secondary-dark-v2--hover g-font-size-default"
                      to="/"
                    >
                      <svg
                        className="mr-1 g-ml-minus-10"
                        xmlns="http://www.w3.org/2000/svg"
                        height="11"
                        width="27"
                        viewBox="0 0 640 480"
                      >
                        <g fillRule="evenodd" strokeWidth="1pt">
                          <path fill="#fff" d="M0 0h640v480H0z" />
                          <path fill="#0039a6" d="M0 160.003h640V480H0z" />
                          <path fill="#d52b1e" d="M0 319.997h640V480H0z" />
                        </g>
                      </svg>
                      Russian
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Language */}

              {/*Jump To*/}
              <li className="list-inline-item g-pos-rel">
                <Link
                  id="jump-to-dropdown-invoker"
                  className="d-block d-lg-none u-link-v5 g-color-white-opacity-0_7 g-color-white--hover g-font-size-12 text-uppercase g-py-7"
                  to="/"
                  aria-controls="jump-to-dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-dropdown-event="hover"
                  data-dropdown-target="#jump-to-dropdown"
                  data-dropdown-type="css-animation"
                  data-dropdown-duration="0"
                  data-dropdown-hide-on-scroll="true"
                  data-dropdown-animation-in="fadeIn"
                  data-dropdown-animation-out="fadeOut"
                >
                  Jump To
                  <i className="g-ml-3 fa fa-angle-down" />
                </Link>
                <ul
                  id="jump-to-dropdown"
                  className="list-unstyled u-shadow-v39 g-brd-around g-brd-4 g-brd-white g-bg-secondary g-pos-abs g-left-0 g-z-index-99 g-mt-13"
                  aria-labelledby="jump-to-dropdown-invoker"
                >
                  <li className="dropdown-item g-brd-bottom g-brd-2 g-brd-white g-px-0 g-py-2">
                    <Link
                      className="nav-link g-color-main g-color-primary--hover g-bg-secondary-dark-v2--hover g-font-size-default"
                      to="/networkmembers"
                    >
                      Network Members
                    </Link>
                  </li>
                  <li className="dropdown-item g-px-0 g-py-2">
                    {props.isLoggedIn || (
                      <Link
                        className="nav-link g-color-white g-bg-primary g-bg-primary-light-v1--hover g-font-size-default"
                        to="/login"
                      >
                        Sign In
                      </Link>
                    )}
                  </li>
                  <li className="dropdown-item g-px-0 g-py-2">
                    {!props.isLoggedIn || (
                      <Link
                        className="nav-link g-color-white g-bg-primary g-bg-primary-light-v1--hover g-font-size-default"
                        to="/logout"
                      >
                        Sign Out
                      </Link>
                    )}
                  </li>
                </ul>
              </li>
              {/*End Jump To*/}

              {/* Links */}
              <li className="list-inline-item d-none d-lg-inline-block">
                <Link
                  className="u-link-v5 g-color-white-opacity-0_7 g-color-white--hover g-font-size-12 text-uppercase g-px-10 g-py-15"
                  to="/networkmembers"
                >
                  Network Members
                </Link>
              </li>
              {props.isLoggedIn || (
                <li className="list-inline-item d-none d-lg-inline-block">
                  <Link
                    className="u-link-v5 u-shadow-v19 g-color-white--hover g-bg-white g-bg-primary--hover g-font-size-12 text-uppercase g-rounded-20 g-px-18 g-py-8 g-ml-10"
                    to="/login"
                  >
                    {" "}
                    Sign In{" "}
                  </Link>
                </li>
              )}
              {!props.isLoggedIn || (
                <div className="list-inline-item d-none d-lg-inline-block">
                  <Link
                    className="u-link-v5 g-brd-around g-brd-white-opacity-0_2 g-color-white-opacity-0_7 g-color-white--hover g-font-size-12 g-rounded-20 text-uppercase g-px-20 g-py-10 g-ml-10 dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/#!"
                  >
                    {props.loggedUser ? props.loggedUser.name : ""}
                  </Link>}
                  <div className="dropdown-menu">
                    <Link
                      className="g-color-white--hover g-color-white-opacity-0_7 g-bg-main g-font-size-12 text-uppercase dropdown-item"
                      to="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      className="g-color-white--hover g-color-white-opacity-0_7 g-bg-main g-font-size-12 text-uppercase dropdown-item"
                      to="/messenger"
                    >
                      Messenger
                    </Link>
                    <IsAdmin>
                      <Link
                        className="g-color-white--hover g-color-white-opacity-0_7 g-bg-main g-font-size-12 text-uppercase dropdown-item"
                        to="/admin"
                      >
                        Admin Dashboard
                      </Link>
                    </IsAdmin>
                    <Link
                      className="g-color-white--hover g-color-white-opacity-0_7 g-bg-main g-font-size-12 text-uppercase dropdown-item"
                      to="/logout"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
              {/* End Links */}

              {/* Search */}
              <li className="list-inline-item g-ml-15--lg ml-auto">
                <form
                  id="searchform-1"
                  className="input-group u-shadow-v19 g-brd-primary--focus g-rounded-20"
                >
                  <input
                    className="form-control g-brd-none g-bg-white g-font-size-12 text-uppercase g-rounded-left-20 g-pl-20 g-py-9"
                    type="text"
                    placeholder="Search here ..."
                  />
                  <button
                    className="btn input-group-addon d-flex align-items-center g-brd-none g-color-white g-bg-primary g-bg-primary-light-v1--hover g-font-size-13 g-rounded-right-20 g-transition-0_2"
                    type="button"
                  >
                    <i className="fa fa-search" />
                  </button>
                </form>
              </li>
              {/* End Search */}
            </ul>
          </div>
        </div>
        {/* End Top Bar */}
        <div className="container">
          {/* Nav */}
          <nav className="js-mega-menu navbar navbar-expand-lg g-px-0 g-py-5 g-py-0--lg">
            {/* Logo */}
            <Link
              className="navbar-brand g-max-width-170 g-max-width-200--lg"
              to="/"
            >
              <img
                className="img-fluid g-hidden-lg-down"
                src="assets/img/logo/nj4_logo_final_california-page-001.jpg"
                alt="Logo"
              />
              <img
                className="img-fluid g-width-80 g-hidden-md-down g-hidden-xl-up"
                src="assets/img/logo/nj4_logo_final_california-page-001.jpg"
                alt="Logo"
              />
              <img
                className="img-fluid g-hidden-lg-up"
                src="assets/img/logo/nj4_logo_final_california-page-001.jpg"
                alt="Logo"
              />
            </Link>
            {/* End Logo */}

            {/* Reponsive Toggle Button */}
            <button
              className="navbar-toggler navbar-toggler-right btn g-line-height-1 g-brd-none g-pa-0"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="navBar"
              data-toggle="collapse"
              data-target="#navBar"
            >
              <span className="hamburger hamburger--slider g-px-0">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>
            </button>
            {/* End Responsive Toggle Button*/}

            {/* Navigation */}
            <div id="navBar" className="collapse navbar-collapse">
              <ul className="navbar-nav align-items-lg-center g-py-30 g-py-0--lg ml-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-px-15--lg g-py-10 g-py-30--lg"
                    to="/"
                  >
                    Main
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-px-15--lg g-py-10 g-py-30--lg"
                    to="/projects"
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-px-15--lg g-py-10 g-py-30--lg"
                    to="#!"
                  >
                    Maps
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-px-15--lg g-py-10 g-py-30--lg"
                    to="/events"
                  >
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-pl-15--lg g-pr-0--lg g-py-10 g-py-30--lg"
                    to="/blogs"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-pl-15--lg g-pr-0--lg g-py-10 g-py-30--lg"
                    to="/news"
                  >
                    News
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link g-color-primary--hover g-font-size-15 g-font-size-17--xl g-px-15--lg g-py-10 g-py-30--lg"
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            {/* End Navigation */}
          </nav>
          {/* End Nav */}
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/research" component={Research} />
        <Route path="/events" component={Events} />
        <Route path="/eventspreview" component={EventsPreview} />
        <Route path="/news" component={News} />
        <Route path="/help" component={Help} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blogcomment" component={BlogComment} />
        <Route path="/blogsyndication/:id" component={BlogSyndication} />
        <PrivateRoute
          path="/aboutus"
          component={AboutUs}
          requiredRole={"user"}
        />
        <Route path="/projects" component={Projects} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/register" component={Registration} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route
          path="/resetpasswordconfirmation"
          component={ResetPassConfirmation}
        />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/personlist" component={PersonList} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/confirmemail" component={ConfirmationEmail} />
        <Route path="/confirmemail/:id" component={ConfirmationEmail} />
        <Route path="/faq" component={Faq} />
        <Route path="/networkmembers" component={NetworkMembers} />
        <Route path="/reports" component={Reports} />
        <Route path="/links" component={Links} />
        <Route
          path="/profileaddsocialmedia/:id"
          component={ProfileAddSocialMedia}
        />
        <Route
          exact
          path="/profileaddsocialmedia"
          component={ProfileAddSocialMedia}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/profileusercontact" component={ProfileUserContact} />
        <Route path="/profileproject" component={ProfileProject} />
        <Route path="/profilesetting" component={ProfileSetting} />
        <Route path="/profileoverall" component={ProfileOverall} />
        <Route path="/maps" component={Maps} />
        <Route
          path="/admin"
          component={() =>
            (window.location = "http://" + window.location.host + "/admin")
          }
        />
        <Route path="/notfound" component={NotFoundPage} />
        <Route path="/unauthorized" component={UnAuthorizedPage} />
        <Route path="/messenger" component={MessengerApp} />
        <Redirect to="/notfound" />
      </Switch>

      {/* Footer */}
      <footer id="footer" className="g-bg-secondary g-pt-30 g-pb-30">
        <div className="container">
          <div className="row justify-content-lg-center align-items-center text-center g-mb-40">
            <div className="col-4 col-md-3 g-mb-20">
              {/* Footer Links */}
              <ul className="list-unstyled">
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/"
                  >
                    Main
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/research"
                  >
                    Research
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/projects"
                  >
                    Projects
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/maps"
                  >
                    Maps
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/events"
                  >
                    Events
                  </Link>
                </li>
              </ul>
              {/* End Footer Links */}
            </div>
            <div className="col-4 col-md-3 g-mb-20">
              {/* Footer Links */}
              <ul className="list-unstyled">
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/links"
                  >
                    Links
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/networkmembers"
                  >
                    Network Members
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/news"
                  >
                    News
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/help"
                  >
                    Help
                  </Link>
                </li>
              </ul>
              {/* End Footer Links */}
            </div>
            <div className="col- col-md-3 g-mb-20">
              {/* Footer Links */}
              <ul className="list-unstyled">
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/contactus"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/"
                  >
                    Careers
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/"
                  >
                    Accessibility
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="g-py-5">
                  <Link
                    className="u-link-v5 g-color-footer-links g-color-primary--hover g-font-size-16"
                    to="/"
                  >
                    Site Feedback
                  </Link>
                </li>
              </ul>
              {/* End Footer Links */}
            </div>
          </div>
          {/* Footer Copyright */}
          <div className="row justify-content-lg-center align-items-center text-center">
            <div className="col-sm-6 col-md-4 col-lg-3 order-md-3 g-mb-30">
              <Link
                className="u-link-v5 g-color-text g-color-primary--hover"
                to="/"
              >
                <i className="align-middle mr-2 icon-real-estate-027 u-line-icon-pro" />
                750 North Lake Shore Drive Fourth Floor Chicago, IL 60611-4403
              </Link>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 order-md-2 g-mb-30">
              {/* Social Icons */}
              <ul className="list-inline mb-0">
                <li className="list-inline-item g-mx-2">
                  <Link
                    className="u-icon-v1 u-icon-size--sm u-shadow-v32 g-color-primary g-color-white--hover g-bg-white g-bg-primary--hover rounded-circle"
                    to="/"
                  >
                    <i className="g-font-size-default fa fa-twitter" />
                  </Link>
                </li>
                <li className="list-inline-item g-mx-2">
                  <Link
                    className="u-icon-v1 u-icon-size--sm u-shadow-v32 g-color-primary g-color-white--hover g-bg-white g-bg-primary--hover rounded-circle"
                    to="/"
                  >
                    <i className="g-font-size-default fa fa-facebook" />
                  </Link>
                </li>
                <li className="list-inline-item g-mx-2">
                  <Link
                    className="u-icon-v1 u-icon-size--sm u-shadow-v32 g-color-primary g-color-white--hover g-bg-white g-bg-primary--hover rounded-circle"
                    to="/"
                  >
                    <i className="g-font-size-default fa fa-instagram" />
                  </Link>
                </li>
                <li className="list-inline-item g-mx-2">
                  <Link
                    className="u-icon-v1 u-icon-size--sm u-shadow-v32 g-color-primary g-color-white--hover g-bg-white g-bg-primary--hover rounded-circle"
                    to="/"
                  >
                    <i className="g-font-size-default fa fa-youtube" />
                  </Link>
                </li>
                <li className="list-inline-item g-mx-2">
                  <Link
                    className="u-icon-v1 u-icon-size--sm u-shadow-v32 g-color-primary g-color-white--hover g-bg-white g-bg-primary--hover rounded-circle"
                    to="/"
                  >
                    <i className="g-font-size-default fa fa-linkedin" />
                  </Link>
                </li>
              </ul>
              {/* End Social Icons */}
            </div>
            <div className="col-md-4 col-lg-3 order-md-1 g-mb-30">
              <p className="g-color-text mb-0">Future of Latinos - 2016</p>
            </div>
          </div>
        </div>
      </footer>
    </header>
  </Router>
);

export default Routes;
