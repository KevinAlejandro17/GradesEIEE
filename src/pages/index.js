import React from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

import { Box, Container } from "@mui/material/";
import Side from "./components/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

const Home = () => {
  return (
    <>
      <ProSidebarProvider>
        <Box sx={{ mb: "80px" }}>
          <Navbar />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Side />
          <Container>
            <Table />
          </Container>
        </Box>
      </ProSidebarProvider>
    </>
  );
};

export default Home;