import React, { useState } from "react";
import * as XLSX from "xlsx";

const Table = () => {
  const [items, setItems] = useState([]);
  const [asignatura, setAsignatura] = useState("");
  const [profesor, setProfesor] = useState("");
  const [grupo, setGrupo] = useState("");

  function capitalizeWords(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
  }

  const readExcel = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    const data = await new Promise((resolve, reject) => {
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const subject_data = XLSX.utils.sheet_to_json(ws);
        const students_data = XLSX.utils.sheet_to_json(ws, { range: 3 });

        const subject = subject_data[0];
        const teacher = subject_data[1];

        const handleGroup = (str) => {
          setGrupo(str);
        };

        function getSubjectInfo(str) {
          let espacio = " ";
          let coincide = null;

          let coincidencia = str.match(
            /ASIGNATURA: ([\wÀ-ÿ]+) ([\w\sÀ-ÿ]+) Gr.: (\d+)/
          );

          if (coincidencia) {
            coincide = coincidencia[1].concat(espacio, coincidencia[2]);
            handleGroup("Grupo: ".concat(coincidencia[3]));
          }
          return coincide;
        }

        const asignatura =
          subject["SISTEMA DE REGISTRO ACADÉMICO Y ADMISIONES (SRA)"];

        function getTeacherInfo(str) {
          let espacio = " ";
          let coincidencia = str.match(/PROFESOR: (\w+) (\w+) (\w+)/);
          if (coincidencia) {
            return "Profesor:".concat(
              espacio,
              coincidencia[1],
              espacio,
              coincidencia[2],
              espacio,
              coincidencia[3]
            );
          } else {
            return null;
          }
        }

        const teacher_name =
          teacher["SISTEMA DE REGISTRO ACADÉMICO Y ADMISIONES (SRA)"];

        setAsignatura(getSubjectInfo(asignatura));
        setProfesor(getTeacherInfo(teacher_name));

        resolve(students_data);
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
    setAsignatura("");
    setProfesor("");
  };

  return (
    <div className="container">
      {asignatura !== "" ? (
        <div className="table-header">
          <h2>
            {asignatura} <br /> {grupo} <br /> {capitalizeWords(profesor)}{" "}
          </h2>
        </div>
      ) : null}
      <div className="upload-container">
        {items.length === 0 ? (
          <div> 
            <label htmlFor="file-upload" className="custom-file-upload">
              Cargar datos asignatura
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
          </div>
        ) : (
          <button onClick={clearTable} className="custom-file-button">
            Limpiar tabla
          </button>
        )}
      </div>

      <div className="table-container">
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
    </div>
  );
};

export default Table;
