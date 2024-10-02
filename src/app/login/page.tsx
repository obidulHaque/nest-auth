"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Login() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      await axios.post("/api/users/login", data);
      setloading(true);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Problem", error.message);
    }
  };
  useEffect(() => {
    if (data.email.length > 0 && data.password.length > 0) {
      setbuttonDisable(true);
    } else {
      setbuttonDisable(false);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading" : "Login"} </h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={data.email}
        onChange={(e) => setdata({ ...data, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={data.password}
        onChange={(e) => setdata({ ...data, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisable ? "Login" : "No Login"}{" "}
      </button>
      <Link
        href="/signup"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {" "}
        visit SignUP Page{" "}
      </Link>
      <button
        onClick={() => signIn()}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        login in with Github
      </button>
    </div>
  );
}
