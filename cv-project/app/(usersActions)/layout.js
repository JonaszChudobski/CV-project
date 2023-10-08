import Link from "next/link";

export default function LoginLayout({ children }) {
  return (
    <>
      {children}
      <Link href="/">Back to Home</Link>
    </>
  );
}
