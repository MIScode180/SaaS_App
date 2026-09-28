'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { removeKeysFromUrlQuery, formUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SubjectsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }

    router.push(newUrl, { scroll: false });
  }, [subject]);

  return (
    <>
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">Select Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject} className="capitalize">
                {subject}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
}
