import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormDataList from "./FormDataList";
import axios from "./axiosConfig";

function Home() {
  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/formData");
        setFormDataList(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/form/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/formData/${id}`);
      setFormDataList(formDataList.filter((data) => data._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="App">
      <h1>
        <strong>Welcome to Home Page</strong>
      </h1>
      <Link to="/Form">
        <button>Create</button>
      </Link>{" "}
      <FormDataList
        formDataList={formDataList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
