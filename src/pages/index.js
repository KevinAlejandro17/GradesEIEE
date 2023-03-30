import React from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

import { Box } from "@mui/material/";

const Home = () => {
  return (
    <>
      <Box sx={{mb:'60px'}}>
        <Navbar />
      </Box>
      <Table />
    </>
  );
};

export default Home;