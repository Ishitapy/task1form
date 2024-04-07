import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const navigate = useNavigate();
  const { index } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    if (index !== undefined) {
      const formDataList = JSON.parse(localStorage.getItem("formData")) || [];
      if (formDataList[index]) {
        const formData = formDataList[index];
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key, value); // Populate form field with value
        });
      } else {
        // Handle invalid index or record not found
        navigate("/");
      }
    }
  }, [index, setValue, navigate]);

  const onSubmit = (data) => {
    if (index !== undefined) {
      navigate("/summary", {
        state: { formData: { ...data, index }, isAuthenticated: true },
      });
      alert("Here is summary of your data");
    } else {
      // Remove saving of new form data here
      navigate("/summary", {
        state: { formData: data, isAuthenticated: true },
      });
      alert("Here is summary of your data");
    }
  };

  return (
    <div className="App">
      <h1>
        <strong>Form</strong>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name*</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name should have at least 2 characters",
              },
            })}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              minLength: {
                value: 2,
                message: "Last name should have at least 2 characters",
              },
            })}
          />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <label>Email*</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label>Phone Number*</label>
          <input
            type="text"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number should contain only 10 digits",
              },
            })}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber.message}</span>
          )}
        </div>
        {!index && (
          <div>
            <label>Password*</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },

                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
        )}
        {!index && (
          <div>
            <label>Re-enter Password*</label>
            <input
              type="password"
              {...register("passwordConfirm", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm.message}</span>
            )}
          </div>
        )}
        <div>
          <label>Alternate Phone Number</label>
          <input
            type="text"
            {...register("alternatePhoneNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Alternate phone number should contain only digits",
              },
            })}
          />
          {errors.alternatePhoneNumber && (
            <span className="error">{errors.alternatePhoneNumber.message}</span>
          )}
        </div>
        <div>
          <label>Address*</label>
          <textarea
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && (
            <span className="error">{errors.address.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default Form;
