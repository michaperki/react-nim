// Landing Page

import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <section>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Nim</h1>
          <div className="mb-4">
            <Link to="/login" className="block text-gray-700 font-medium">
              Login
            </Link>
          </div>
          <div className="mb-4">
            <Link to="/signup" className="block text-gray-700 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
