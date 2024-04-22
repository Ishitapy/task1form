import React from "react";
import axios from "./axiosConfig";
import "./FormDataList.css";

function FormDataList({ formDataList, onEdit, onDelete }) {
  const handleEdit = (id) => {
    if (typeof onEdit === "function") {
      onEdit(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/formData/${id}`);
      onDelete(id);
      alert("Record deleted");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  if (!Array.isArray(formDataList)) {
    return (
      <div>
        <h2>Form Data List</h2>
        <p>No form data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Form Data List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Alternate Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData, index) => (
            <tr key={formData._id}>
              <td>{formData ? formData.firstName : ""}</td>
              <td>{formData ? formData.lastName : ""}</td>
              <td>{formData ? formData.email : ""}</td>
              <td>{formData ? formData.phoneNumber : ""}</td>
              <td>{formData ? formData.alternatePhoneNumber : ""}</td>
              <td>{formData ? formData.address : ""}</td>
              <td>
                <button onClick={() => handleEdit(formData._id)}>Edit</button>
                <button onClick={() => handleDelete(formData._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormDataList;
