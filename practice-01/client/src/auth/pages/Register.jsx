import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5173/api/auth/register",
        formData,
      );
      console.log(response);
    } catch (error) {
      console.log(
        "Error in Registration",
        error?.message || "Registration Failed",
      );
    }
  };
  return (
    <div className="flex justify-center">
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 min-w-64"
      >
        <input
          onChange={handleChange}
          className="border p-2 rounded-sm"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          required
        />
        <input
          onChange={handleChange}
          className="border p-2 rounded-sm"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your mail"
          required
        />
        <input
          onChange={handleChange}
          className="border p-2 rounded-sm"
          type="text"
          name="password"
          value={formData.password}
          placeholder="Create a password"
          required
        />
        <button className="border p-2 rounded-sm bg-green-400 text-white font-bold cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
