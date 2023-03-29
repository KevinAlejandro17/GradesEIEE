import React, { useState } from "react";
import * as XLSX from "xlsx";


function Home() {
  const [items, setItems] = useState([]);

  const readExcel = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    const data = await new Promise((resolve, reject) => {
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    const mappedData = data.map((item) => ({
      No: item["No."],
      Código: item["Código"],
      Nombre: item["Nombre Completo"],
      Correo: item["Correo Institucional"],
      Programa: item["Programa"],
      T_Mat: item["T. Mat."],
      Calificación: item["Calif."],
    }));
    setItems(mappedData);
  };

  const clearTable = () => {
    setItems([]);
    document.getElementById("file-upload").value = "";
  };

  return (
    <div className="container">
      <div className="upload-container">
        <label htmlFor="file-upload" className="custom-file-upload">
          Seleccionar archivo
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        <button onClick={clearTable} className="custom-file-button">
          Limpiar tabla
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Programa</th>
            <th>T. Mat.</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.No}>
              <td>{d.No}</td>
              <td>{d.Código}</td>
              <td>{d.Nombre}</td>
              <td>{d.Correo}</td>
              <td>{d.Programa}</td>
              <td>{d.T_Mat}</td>
              <td>{d.Calificación}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
