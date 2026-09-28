"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, Show, UserButton } from "@clerk/nextjs"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="Logo" width={55} height={55} />
        </div>
      </Link>
      
      <div className="flex items-center gap-6">
        <NavItems />
        
        {/*  Use <Show when="signed-out"> instead of <SignedOut> */}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="bg-[#6E1A37] text-white  px-4 py-2 rounded-md cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </Show>

        {/*  Use <Show when="signed-in"> */}
        <Show when="signed-in" >
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}