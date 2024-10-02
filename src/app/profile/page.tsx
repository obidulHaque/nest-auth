"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
export default async function profile() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Fail", error.message);
    }
  };

  return (
    <div className="flex-col w-full h-screen text-[2vw] justify-center items-center flex ">
      <p>This is Your profile </p>
      <button
        onClick={onLogout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-[1vw] "
      >
        Logout
      </button>
    </div>
  );
}
