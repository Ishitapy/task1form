import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "./axiosConfig";

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated;
  const formData = location.state?.formData;
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    // Redirect to home page if not authenticated or no form data
    if (!isAuthenticated || !formData) {
      navigate("/");
    }
  }, [isAuthenticated, formData, navigate]);

  const handleSubmit = async () => {
    try {
      console.log("Form data:", formData);

      if (formData && !submitted) {
        if (formData._id) {
          // If id exists, it means we're updating existing data
          const response = await axios.put(
            `http://localhost:5000/api/formData/${formData._id}`,
            formData
          );
          setSubmitted(true);
          alert("Your form is updated");
          navigate("/", { state: { updatedData: response.data } });
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/formData",
            formData
          );
          setSubmitted(true);
          alert("Your form is submitted");
          navigate("/", { state: { updatedData: response.data } });
        }
      } else {
        console.error("Form data is missing.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
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
