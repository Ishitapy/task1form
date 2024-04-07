import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormDataList from "./FormDataList";

function Home() {
  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);
  useEffect(() => {
    // Retrieving form data from local storage
    const dataFromStorage = JSON.parse(localStorage.getItem("formData")) || [];
    setFormDataList(dataFromStorage);
  }, []);

  useEffect(() => {
    const updatedData = navigate?.state?.updatedData;
    if (updatedData) {
      // Update the local state with the updated data
      setFormDataList((prevData) =>
        prevData.map((item) =>
          item.index === updatedData.index ? updatedData : item
        )
      );
    }
  }, [navigate?.state?.updatedData]);
  const handleEdit = (index) => {
    navigate(`/form/edit/${index}`);
  };

  return (
    <div className="App">
      <h1>
        <strong>Welcome to Home Page</strong>
      </h1>
      <Link to="/Form">
        <button>Create</button>
      </Link>{" "}
      <FormDataList formDataList={formDataList} onEdit={handleEdit} />
    </div>
  );
}

export default Home;
