"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";

export default function verifyEmail() {
  const [token, settoken] = useState("");
  const [verify, setverify] = useState(false);
  const [error, seterror] = useState(false);
  const onVerify = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverify(true);
    } catch (error: any) {
      console.log("verify fail", error.message);
      seterror(true);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    settoken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      onVerify();
    }
  }, [token]);

  return (
    <div className="flex text-[2vw] items-center justify-center min-h-screen py-2">
      {verify && (
        <div>
          <p>Your verification successful</p>
          <Link
            href="/login"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-[1vw] px-6 "
          >
            Login{" "}
          </Link>
        </div>
      )}
      {error && (
        <div>
          <p>Verification Fail</p>
        </div>
      )}
    </div>
  );
}
