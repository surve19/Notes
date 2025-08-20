import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Mail, Lock } from "lucide-react";
 
const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });
 
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
 
  const handleSubmit = async (e) => {

    e.preventDefault();
 
    if (!formData.email || !formData.password) {

      alert("Please enter email and password");

      return;

    }
 
    try {

      // TODO: Connect to your backend login API

      console.log("Login form submitted:", formData);
 
      // Redirect after successful login

      navigate("/");

    } catch (err) {

      console.error(err);

      alert("Invalid credentials. Try again.");

    }

  };
 
  return (
<div className="flex justify-center items-center min-h-screen bg-[#f5f7fa]">
<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full">
<h1 className="font-mono text-3xl font-bold text-[#03045e] mb-6 text-center">

          Welcome Back
</h1>
 
        <form className="space-y-6" onSubmit={handleSubmit}>

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

            Log In
</button>
</form>
 
        {/* Link to signup */}
<p className="text-center text-gray-600 mt-6">

          Don’t have an account?{" "}
<span

            className="text-[#03045e] font-semibold cursor-pointer"

            onClick={() => navigate("/signup")}
>

            Sign up
</span>
</p>
</div>
</div>

  );

};
 
export default Login;

 