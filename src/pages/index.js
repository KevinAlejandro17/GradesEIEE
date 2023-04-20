import React from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

import { Box, Container } from "@mui/material/";
import Side from "./components/Sidebar";

const Home = () => {
  return (
    <>
        <Box sx={{ mb: "80px" }}>
          <Navbar />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Side />
          <Container>
            <Table />
          </Container>
        </Box>
    </>
  );
};

export default Home;