import React from "react";

import "./FormDataList.css";

function FormDataList({ formDataList, onEdit }) {
  const handleEdit = (index) => {
    if (typeof onEdit === "function") {
      onEdit(index);
    }
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
              <td>{formData ? formData.firstName : ""}</td>
              <td>{formData ? formData.lastName : ""}</td>
              <td>{formData ? formData.email : ""}</td>
              <td>{formData ? formData.phoneNumber : ""}</td>
              <td>{formData ? formData.alternatePhoneNumber : ""}</td>
              <td>{formData ? formData.address : ""}</td>
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
