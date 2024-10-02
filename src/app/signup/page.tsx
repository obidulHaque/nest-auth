"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setbuttonDisable] = useState(false);
  useEffect(() => {
    if (
      data.username.length > 0 &&
      data.email.length > 0 &&
      data.password.length > 0
    ) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [data]);

  const onSignUp = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", data);
      console.log("Signup success", response.data);
      router.push("/notice");
    } catch (error: any) {
      console.log("sign up Problem", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "loading" : "SignUp"} </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={data.username}
        onChange={(e) => setdata({ ...data, username: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        value={data.email}
        onChange={(e) => setdata({ ...data, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={data.password}
        onChange={(e) => setdata({ ...data, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisable ? "No SignUp" : "Sign UP"}{" "}
      </button>
      <Link
        href="/login"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {" "}
        Login Page
      </Link>
    </div>
  );
}
