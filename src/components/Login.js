import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ handleUserLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    // Simple email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error("Invalid email format");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleUserLogin(user); // Pass the user information to handleUserLogin
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <section>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Nim</h2>

          <form onSubmit={onLogin}>
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-gray-700 font-medium"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full border rounded-md px-3 py-2 mt-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full border rounded-md px-3 py-2 mt-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-700 text-center">
            No account yet?{" "}
            <NavLink to="/signup" className="text-blue-600">
              Sign up
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
