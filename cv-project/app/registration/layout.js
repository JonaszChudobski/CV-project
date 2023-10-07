import Link from "next/link";
import { Links } from "../components/links";

export default function RegistrationLayout({ children }) {
  return (
    <>
      <Links></Links>
      {children}
      <Link href="/">Back to Home</Link>
    </>
  );
}
