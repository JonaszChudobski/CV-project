import { LoggingLinks } from "@/app/_components/nav";
import Link from "next/link";

export default function LoginLayout({ children }) {
  return (
    <>
      <LoggingLinks></LoggingLinks>
      {children}
    </>
  );
}
