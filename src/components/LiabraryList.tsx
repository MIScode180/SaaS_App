
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface liabraryListProps {
  title: string;
  libraries?: Library[];
  classNames?: string;
}

export default function LiabraryList({ title, libraries, classNames}: liabraryListProps) {
  return (
    <>
      <article className={cn("library-list", classNames)}>
        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>

        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3">Lessons</TableHead>
              <TableHead className="text-lg">Subject</TableHead>
              <TableHead className="text-lg text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {libraries?.map(({ id , subject, name, topic, duration }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/libraries/${id}`} >
                   <div  className="flex items-center gap-2">
                      <div
                        className="flex items-center  justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl">{name}</p>
                        <p className="text-gray-800 text-sm">{topic}</p>
                      </div>
                      </div>
                  </Link>
                </TableCell>

                <TableCell>
                  <div className="subject-badge w-fit max-md:hidden">
                    {subject}
                  </div>
                  <div
                    className="flex justify-center items-center w-fit  p-2 md:hidden rounded-lg"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                  >
                    <Image src={`/icons/${subject}.svg`} alt={subject} height={10} width={10}  />
                    <div className="gap-2 flex items-center justify-center text-xs  font-bold p-2 bg-opacity-20 rounded-lg">
                      {subject}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center w-full gap-2 justify-end ">
                    <p className="text-md lg:text-lg">
                      {duration} {' '}
                      <span className="max-md:hidden">
                        mins
                      </span>
                    </p>

                    <Image src="/icons/clock.svg" alt="minutes" width={10} height={10} className="md:hidden" />
                  </div>
                </TableCell>  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
    </>
  )
}
