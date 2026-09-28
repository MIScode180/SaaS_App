
import LaibraryForm from "@/components/LiabraryForm";
import { newLibraryPermission } from "@/lib/actions/library.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation"

export default async function NewLearning() {

const {userId} = await auth()
if(!userId) {
  redirect("/sign-in")
}

const createLibraries = await  newLibraryPermission()

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
        {createLibraries ? (
          <article className="w-full max-w-2xl flex flex-col gap-6 text-center">
        
        <h1 className="text-2xl font-semibold">
          Build Your Learning Library
        </h1>

        <LaibraryForm />

      </article>
        ): (
<article className="library-limit">
  <Image src="/images/limit.svg" alt="Limit Reached" width={400} height={400} className="mx-auto" />
  <div className="cta-badge">
    Upgrade to pro
  </div>
  <h1>
    You have reached the limit of creating libraries.
  </h1>
  <p>
    Upgrade to the pro plan to create unlimited libraries and access exclusive features.
  </p>
  <Link href="/subscription" className="btn-primary justify-center w-full" >
    Upgrade my Plan
  </Link>
</article>
        )}
    </main>
  );
}
