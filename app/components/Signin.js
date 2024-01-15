import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const SignIn = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userQuery = query(
        collection(db, "users"),
        where("employeeId", "==", employeeId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setError("User not found");
      }
    } catch (error) {
      setError("Error signing in. Please try again.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="employeeId"
          >
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            className="w-full border border-gray-300 rounded-md p-2"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
