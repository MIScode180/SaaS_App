import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <>
      <section className="cta-section bg-[#232322]">
        <div className="cta-badge">Learn With AI Guidance</div>
        <h2 className="text-xl font-bold tracking-tight">
          Track progress, join sessions, and achieve your academic goals faster.
        </h2>
        <p className="">
          Learn smarter with AI-powered teaching, personalized lessons, instant
          doubt solving, and interactive learning designed to help students grow
          faster.
        </p>
        <Image
          src="images/cta.svg"
          alt="cta"
          width={362}
          height={232}
          className="bg-[#2C2C2C]"
        />
        <button className="btn-primary">
          <Image src="icons/plus.svg" alt="plus" width={16} height={16} className=" text-black"/>
          <Link href="/liabrary/new">
            Create New Library
          </Link>
        </button>
      </section>
    </>
  );
}
