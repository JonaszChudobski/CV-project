"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Links() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link
            className={`link ${pathname === "registration" ? "active" : ""}`}
            href="/registration"
          >
            Registration
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "login" ? "active" : ""}`}
            href="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
