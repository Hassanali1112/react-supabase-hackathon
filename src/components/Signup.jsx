import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/config";

const SignUp = () => {
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

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(formData.firstName)) {
      toast.error("First name must contain at least 2 letters.");
      return false;
    }

    if (!nameRegex.test(formData.lastName)) {
      toast.error("Last name must contain at least 2 letters.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address.");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be 8+ characters with uppercase, lowercase, and a number."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // You can replace this with Supabase logic
    console.log("Form submitted:", formData);
    
    // sign throw supabse 

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      if (error) {
        throw error;
      }
      if (data) {
        console.log('sign up data=>',data)
        const { data : userData, error : userError } = await supabase
          .from("users")
          .insert({ firstName : formData.firstName, lastName : formData.lastName, email : formData.email })
          .select();

          if(userData){
            console.log(userData)
          } else{
            console.log(userError)
          }

      }
    } catch (error) {
      console.log('signup data error =>', error)
    }
    toast.success("Signed up successfully!");

    // navigate("/sign-in");
  };

  return (
    <div
      className="container mt-5 border border-danger p-5"
      style={{ maxWidth: "500px" }}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4">Sign Up</h3>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

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

export default SignUp;
