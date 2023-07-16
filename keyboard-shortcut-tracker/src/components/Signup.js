import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/login');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <section>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Shortcut Tracker</h1>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-gray-700 font-medium">
                Email address
              </label>
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
              Sign up
            </button>
          </form>

          <p className="text-sm text-gray-700 text-center">
            Already have an account?{' '}
            <NavLink to="/login" className="text-blue-600">
              Sign in
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
