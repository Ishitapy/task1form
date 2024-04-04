import React from "react";
import { useNavigate } from "react-router-dom";
import "./FormDataList.css";

function FormDataList() {
  // Retrieving form data from local storage
  const formDataList = JSON.parse(localStorage.getItem("formData")) || [];
  const navigate = useNavigate();

  const handleEdit = (index) => {
    // Redirecting to form page with edit flag
    navigate(`/form/edit/${index}`);
  };

  const handleDelete = (index) => {
    // Deleting the record at the given index
    const updatedFormDataList = [...formDataList];
    updatedFormDataList.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(updatedFormDataList));
    // Reload the page to reflect the changes
    window.location.reload();
    alert("Record deleted");
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
            <tr key={index}>
              <td>{formData.firstName}</td>
              <td>{formData.lastName}</td>
              <td>{formData.email}</td>
              <td>{formData.phoneNumber}</td>
              <td>{formData.alternatePhoneNumber}</td>
              <td>{formData.address}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormDataList;
