import Link from "next/link";
import { CurriculumLinks } from "../../_components/curriculumLinks";

export default function CurriculumLayout({ children }) {
  return (
    <>
      <CurriculumLinks></CurriculumLinks>
      {children}
      <Link href={"/comment"}>Leave the comment</Link>
      <Link href="/">Back to Home</Link>
    </>
  );
}
