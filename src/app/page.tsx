
import CTA from "@/components/CTA";
import LiabraryCard from "@/components/LiabraryCard";
import LiabraryList from "@/components/LiabraryList";
import {
  getAllLibraries,
  getActiveHistory,
} from "@/lib/actions/library.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const libraies = await getAllLibraries({ limit: 3 });
  const recentsSessionLibraries = await getActiveHistory(10);

  return (
    <>
      <main>
        <h1>Trending Courses</h1>

        <section className="home-section">
          {libraies.map((library) => (
            <LiabraryCard
            key={library.id}
            {...library}
            color={getSubjectColor(library.subject)}
            />
          ))}

        </section>

        <section className="home-section">
          <LiabraryList
            title="Recently Finished Sessions"
            libraries={recentsSessionLibraries}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Page;
