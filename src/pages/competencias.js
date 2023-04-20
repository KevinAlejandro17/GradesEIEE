import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

import { createSCC, getSCCs } from "../../lib/SCCApi";
import { Box, Container } from "@mui/material/";
import Side from "./components/Sidebar";

const Competencias = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [refresh, setRefresh] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    createSCC({ id, nombre, descripcion });
    setId("");
    setNombre("");
    setDescripcion("");
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const [sccs, setSccs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSCCs();
      setSccs(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <Box sx={{ mb: "80px" }}>
        <Navbar />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Side />
        <Container>
          <form onSubmit={handleSubmit}>
            <h1>Agregar SCC</h1>
            <div className="grid">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <input type="submit" value="Agregar" />
          </form>


          <table className="scc-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {sccs.map((scc) => (
                <tr key={scc.id}>
                  <td>{scc.id}</td>
                  <td>{scc.nombre}</td>
                  <td>{scc.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Box>
    </>
  );
};

export default Competencias;