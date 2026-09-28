import { getAllLibraries } from "@/lib/actions/library.actions";
import LiabraryCard from "@/components/LiabraryCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectsFilter from "@/components/SubjectsFilter";
import SearchInput from "@/components/SearchInput";

export default async function LearningLibrary({ searchParams }: SearchParams) {
  const fliters = await searchParams;
  const subject = fliters.subject ? fliters.subject : "";
  const topic = fliters.topic ? fliters.topic : "";

  const libraries = await getAllLibraries({ subject, topic });



  return (
    <>
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>
            Learning Libraries
          </h1>
          <div className="flex gap-2">
            <SearchInput />
             <SubjectsFilter />
          </div>
        </section>
        <section className="liabraries-grid">
         {libraries.map((library) => (
            <LiabraryCard  key={library.id} {...library} color={getSubjectColor(library.subject)} />
          ))}
        </section>
      </main>
    </>
  );
} 
