"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-[1vw] justify-between flex px-10 py-5 ">
        <div>
          {" "}
          <Link href="/">Home</Link>{" "}
        </div>
        <div className="gap-5 flex">
          <Link href="/login">Login</Link>
          <Link href="/signup">SignUp</Link>
        </div>
      </div>
    );
  }
  if (session) {
    return (
      <div className="text-[1vw] justify-between flex px-10 py-5">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className="flex gap-5">
          {session.user?.email}
          <div className="w-[2vw] h-[2vw] rounded-[50%] overflow-hidden ">
            <img src={`${session.user?.image}`} alt="" />
          </div>
          <button onClick={() => signOut()}>LogOut</button>
        </div>
      </div>
    );
  }
}

export default Nav;
