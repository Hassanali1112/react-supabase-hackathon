import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add form validation and API call here
    console.log("Form submitted:", formData);

    // Redirect user or show success message
    navigate("/user-dashboard");
  };

  return (
    <div className="container mt-5 border border-danger p-5" style={{ maxWidth: "500px" }}>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4">Sign In</h3>

       

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        <p className="mt-3 text-center">
          Already registered? <a href="/sign-in">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
