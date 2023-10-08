"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAlertService } from "../_services/useAlertService";

export function Alert() {
  const pathname = usePathname();
  const alertService = useAlertService();
  const alert = alertService.alert;

  useEffect(() => {
    alertService.clear();
  }, [pathname]);

  if (!alert) return null;

  return (
    <div>
      <div>
        <div>
          {alert.message}
          <button type="button" onClick={alertService.clear}></button>
        </div>
      </div>
    </div>
  );
}
