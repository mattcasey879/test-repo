import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import { Container } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserRole, isTokenExpired } from "../utils/helpers";

const Header = (props) => {
  const navigate = useNavigate();
  const { setLoggedIn, loggedIn, setEditMode } = props;
  let role = "";

  // checking if token is still there on re-render
  useEffect(() => {
    setLoggedIn(isTokenExpired());
    // eslint-disable-next-line
  }, []);
  role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem("AuthenticationToken");
    props.setLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar sx={{ backgroundColor: "white", color: "black" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <DevicesIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: "1" }}>
            Full Stack Coding Challenge React Front End
          </Typography>
          {loggedIn && (
            <>
              {role === "admin" && (
                <>
                  <Link to="/employees" style={{ textDecoration: "none" }}>
                    <Button variant="contained">All Employees</Button>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", margin: "0 10%" }}
                    to="/new-employee"
                  >
                    <Button onClick={() => setEditMode(false)} variant="contained">Add Employee</Button>
                  </Link>
                </>
              )}
              <IconButton onClick={handleLogout} sx={{ borderRadius: 0 }}>
                <Typography sx={{ mr: 1 }}>Logout</Typography>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
