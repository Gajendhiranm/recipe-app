import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./Navbar.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="box-container"
          >
            <Link to="/home">
              <img
                src="./images/recipe-logo.png"
                height={50}
                alt="burger-icon"
              />
            </Link>

            <Box display="flex">
              <Link to="/favorites">
                <Button
                  variant="outlined"
                  startIcon={<FavoriteBorderOutlinedIcon />}
                  className="Favorities-btn"
                >
                  Favorites
                </Button>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
