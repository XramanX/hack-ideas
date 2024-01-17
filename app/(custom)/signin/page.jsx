"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/app/store/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.id) {
      router.push("/home");
    }
  }, [user]);

  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const userQuery = query(
        collection(db, "users"),
        where("employeeId", "==", employeeId)
      );
      onSnapshot(userQuery, (snapshot) => {
        setLoading(false);

        if (snapshot.empty) {
          setError("User not found");
        } else {
          snapshot.forEach((doc) => {
            dispatch(setUser({ ...doc.data(), id: doc.id }));
            localStorage.setItem("employeeId", employeeId);
            localStorage.setItem("displayName", doc.data().displayName);
          });
        }
      });
    } catch (error) {
      setLoading(false);
      setError("Error signing in. Please try again.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md text-black">
        <h2
          className="text-3xl font-semibold mb-6 text-center"
          htmlFor="employeeId"
        >
          Employee ID
        </h2>
        <div className="mb-4">
          <input
            type="text"
            id="employeeId"
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
