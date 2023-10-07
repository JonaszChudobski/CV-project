import Link from "next/link";

export default function CurriculumLayout() {
  return (
    <>
      {children}
      <Link href="/">Back to Home</Link>
    </>
  );
}
