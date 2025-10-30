import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";    
import Navbar from "react-bootstrap/Navbar";
import "../Styles/Header.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useState({ profile_image: "" });

  return (
    <header className="sticky-navbar">
      <Navbar expand="lg" className="custom-navbar" bg="dark" variant="dark" sticky="top" collapseOnSelect>
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/home">
            <img src="/Images/logo2.png" alt="logo" width="130px" />
          </Navbar.Brand>

          {/* Toggle for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible menu */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center">
              <Nav.Link as={Link} to="/home">HOME</Nav.Link>
              <Nav.Link as={Link} to="/movies">MOVIES</Nav.Link>
              <Nav.Link as={Link} to="/tvshows">TV SHOWS</Nav.Link>
              <Nav.Link as={Link} to="/popular">NEW & POPULAR</Nav.Link>

              {/* Profile Dropdown */}
              <NavDropdown
                title={
                  <img
                    src={user.profile_image || "/Images/digit_icon.png"}
                    alt="Profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                }
                id="profile-dropdown"
                align="end"
                className="custom-dropdown"
                drop="down"
                renderMenuOnMount={true}
              >
                <NavDropdown.ItemText>
                  <span style={{ fontWeight: "bold", color: "white" }}>DIGIT IT</span>
                </NavDropdown.ItemText>

                <NavDropdown.Divider style={{ borderColor: "white" }} />

                {/* ✅ Works with useNavigate */}
                <NavDropdown.Item onClick={() => navigate("/profile")} style={{ color: "white" }}>
                  Account
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => navigate("/")}
                  style={{ color: "white" }}
                >
                  <FaSignOutAlt style={{ marginRight: "8px" }} />
                  Sign out from Starflix
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
