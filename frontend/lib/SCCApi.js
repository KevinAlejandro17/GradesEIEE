import axios from "axios";

export const createSCC = async ({ id, nombre, descripcion }) => {
  try {
    const response = await axios.post("http://localhost:8000/api/scc/", {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getSCCs = async (id = null) => {
  const url = id ? `http://localhost:8000/api/scc/${id}/` : 'http://localhost:8000/api/scc/';

  try {
    const response = await axios.get(url);
    return(response.data.sccs) ; // devuelve un array con un solo objeto
  } catch (error) {
    console.error(error);
    return [];
  }
};