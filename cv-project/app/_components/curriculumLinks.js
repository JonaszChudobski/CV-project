"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function CurriculumLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link
            className={`link ${pathname === "curriculum" ? "active" : ""}`}
            href="/curriculum"
          >
            Curriculum
          </Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
