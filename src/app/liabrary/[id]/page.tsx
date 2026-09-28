import React from "react";
import { getLibrary } from "@/lib/actions/library.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import LibraryComponent from "@/components/LibraryCompponent";
import Image from "next/image";

export default async function LearingSession({
  params,
}: LibrarySessionComponentProps) {
  const { id } = await params;
  const library = await getLibrary(id);
  const user = await currentUser();

  const {name, subject, title , topic , duration} = library

  if (!user) redirect("/sign-in");
  if (!name) redirect("/library");

  return (
    <>
      <main>
        <article className="flex rounded-border justify-between p-6 max-md:flex-col">
          <div className="flex items-center gap-2">
            <div
              className="size=[72px] flex items-center justify-center rounded-lg max-md:hidden "
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={name}
                width={38}
                height={38}
              />
            </div>
             <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium" >
                  {name}
                </p>
                <div className="subject-badge max-md:hidden" >
                  {subject}
                </div>
              </div>
              <p className="text-sm text-gray-800">
                {topic}
              </p>
            </div>
            <div className="items-start text-xl max-md:hidden">
              {duration} mins
            </div>
          </div>
        </article>
        <LibraryComponent 
        {...library}
        libraryId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}

        />
      </main>
    </>
  );
}
