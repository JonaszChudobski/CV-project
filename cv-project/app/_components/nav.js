"use client";

import { useState } from "react";

import { NavLink } from "./navLink";
import { useUserService } from "../_services/useUserServices";

export function Nav() {
  const [loggingOut, setLoggingOut] = useState(false);
  const userService = useUserService();

  async function logout() {
    setLoggingOut(true);
    await userService.logout();
  }

  return (
    <nav>
      <div>
        <NavLink href="/" exact>
          Home
        </NavLink>
        <button onClick={logout} disabled={loggingOut}>
          {loggingOut ? <span>Loading...</span> : <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
}
