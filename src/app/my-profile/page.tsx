import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserProgress,
  getUserSessions
} from "@/lib/actions/library.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import LiabraryList from "@/components/LiabraryList";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const liabraries = await getUserProgress(user.id);
  const userHistory = await getUserSessions(user.id)

  return (
    <>
      <main className="lg:w-2/3">
        <section className="flex justify-between gap-4 max-sm:flex-col items-center">
          <div className="flex gap-4 items-center">
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              width={110}
              height={110}
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
              <div className="flex gap-2 items-center">
                <Image
                  src="/icons/check.svg"
                  alt="checkmark"
                  width={22}
                  height={22}
                />
                <p className="text-2xl font-bold">{userHistory.length}</p>
              </div>
              <div>Lessons completed</div>
            </div>
            <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
              <div className="flex gap-2 items-center">
                <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
                <p className="text-2xl font-bold">{liabraries.length}</p>
              </div>
              <div>Companions created</div>
            </div>
          </div>
        </section>
        <Accordion type="multiple">
          <AccordionItem value="recent">
            <AccordionTrigger className="text-2xl font-bold">
              Recent Activity
            </AccordionTrigger>
            <AccordionContent>
              <LiabraryList
                title="Recently Finished Sessions"
                libraries={userHistory}
                classNames="w-2/3 max-lg:w-full"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="liabraries">
            <AccordionTrigger className="text-2xl font-bold">
              My liabraries {`(${liabraries.length})`}
            </AccordionTrigger>
            <AccordionContent>
                <LiabraryList
                title="My liabraries"
                libraries={liabraries}
                classNames="w-2/3 max-lg:w-full"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
}
