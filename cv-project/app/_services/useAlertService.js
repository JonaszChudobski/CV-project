import { create } from "zustand";

const alertStore = create(() => ({}));

export function useAlertService() {
  const { alert } = alertStore();

  return {
    alert,
    success: (message, showAfterRedirect = false) => {
      const type = "alert-success";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    error: (message, showAfterRedirect = false) => {
      const type = "alert-error";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    clear: () => {
      alertStore.setState((state) => {
        let alert = state.alert;
        if (alert?.showAfterRedirect) {
          alert.showAfterRedirect = false;
        } else {
          alert = undefined;
        }
        return { alert };
      });
    },
  };
}