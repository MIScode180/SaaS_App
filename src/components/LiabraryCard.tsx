"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBookmark , removeBookmark} from "@/lib/actions/library.actions";

interface LiabraryCardWithProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

export default function Liabrary ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: LiabraryCardWithProps)  {

const  pathname = usePathname();

const handleBookmark = async () => {
    console.log("Card id:", id);
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await createBookmark(id, pathname);
    }
  };

  return (
    <>
      <article className="liabrary-card" style={{ backgroundColor: color }}>
        <div className="flex justify-between items-center">
          <div className="subject-badge"> {subject}</div>
          <button className="library-bookmark"  onClick={handleBookmark}>
            <Image
              src="/icons/bookmark.svg"
              alt="Bookmark"
              width={16.5}
              height={20}
            />
          </button>
        </div>
        <h2 className="font-bold text-2xl">{name}</h2>
        <p className="text-sm text-gray-800">{topic}</p>
        <div className="flex items-center gap-1 mt-2">
          <Image
            src="/icons/clock.svg"
            alt="Clock"
            width={16.5}
            height={20}
            className=""
          />
          <span className="text-sm text-gray-800">{duration} mins</span>
        </div>
        <Link href={`/liabrary/${id}`} className="w-full">
          <button className="btn-primary w-full justify-center bg-[#767F9E]">
            Get Start
          </button>
        </Link>
      </article>
    </>
  );
}
