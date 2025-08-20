import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { User, Mail, Lock } from "lucide-react";

import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

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

    if (!formData.name || !formData.email || !formData.password) {

      alert("Please fill out all fields");

      return;

    }

    try {

      // TODO: Connect to your backend signup API here

      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      if (response.status === 201) {
        alert("Signup successful!");
      }
      console.log("Signup form submitted:", formData);

      console.log("Signup form submitted:", formData);

      // Redirect to login or home after successful signup

      navigate("/login");

    } catch (err) {

      console.error(err);

      alert("Signup failed. Try again.");

    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7fa]">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full">
        <h1 className="font-mono text-3xl font-bold text-[#03045e] mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-1">
              <User size={22} />
              Name
            </label>
            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              placeholder="Enter your name"

              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03045e] transition-colors text-lg"

            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-1">
              <Mail size={22} />

              Email
            </label>
            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter your email"

              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03045e] transition-colors text-lg"

            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-1">
              <Lock size={22} />

              Password
            </label>
            <input

              type="password"

              name="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter your password"

              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03045e] transition-colors text-lg"

            />
          </div>

          {/* Submit */}
          <button

            type="submit"

            className="w-full bg-[#03045e] text-lg text-white font-bold font-mono px-4 py-3 rounded-lg hover:bg-blue-600 transition"
          >

            Sign Up
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}
          <span

            className="text-[#03045e] font-semibold cursor-pointer"

            onClick={() => navigate("/login")}
          >

            Log in
          </span>
        </p>
      </div>
    </div>

  );

};

export default Signup;

