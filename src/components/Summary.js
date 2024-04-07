import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated;
  const formData = location.state?.formData;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true }); // Redirect to home page
      alert("You do not have access to the summary page.");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    console.log("Form data:", formData);

    if (formData) {
      let existingFormData = JSON.parse(localStorage.getItem("formData")) || [];

      if (formData.index !== undefined && existingFormData[formData.index]) {
        // Update existing record
        existingFormData[formData.index] = formData;
      } else {
        // Add new record
        existingFormData.push(formData);
      }

      localStorage.setItem("formData", JSON.stringify(existingFormData));

      alert("Your form is submitted");
      navigate("/", { state: { updatedData: formData } });
    } else {
      console.error("Form data is missing in location state.");
    }
  };

  const goBackToFormPage = () => {
    navigate("/form");
  };

  if (!isAuthenticated) {
    return null; // Avoid rendering the rest of the component if not authenticated
  }

  return (
    <div className="App">
      <h1>Summary Page</h1>
      <div>
        <div>
          <h2>Form Data</h2>
          <ul>
            <li>
              <strong>First Name:</strong> {formData.firstName}
              <br />
              <strong>Last Name:</strong> {formData.lastName}
              <br />
              <strong>Email:</strong> {formData.email}
              <br />
              <strong>Phone Number:</strong> {formData.phoneNumber}
              <br />
              <strong>Password:</strong> {formData.password}
              <br />
              <strong>Alternate Phone Number:</strong>{" "}
              {formData.alternatePhoneNumber}
              <br />
              <strong>Address:</strong> {formData.address}
              <br />
            </li>
          </ul>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={goBackToFormPage}>Go back to form page</button>
          <br />
          <Link to="/form"></Link>
        </div>
      </div>
    </div>
  );
}

export default Summary;
