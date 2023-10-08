import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

import { useAlertService } from "./useAlertService";
import { useFetch } from "../_utils/client/useFetch";

const initialState = {
  users: undefined,
  user: undefined,
  currentUser: undefined,
};
const userStore = create(() => initialState);

export function useUserService() {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users, user, currentUser } = userStore();

  return {
    users,
    user,
    currentUser,
    login: async (username, password) => {
      alertService.clear();
      try {
        const currentUser = await fetch.post("/api/account/login", {
          username,
          password,
        });
        userStore.setState({ ...initialState, currentUser });

        const returnUrl = searchParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } catch (error) {
        alertService.error(error);
      }
    },
    logout: async () => {
      await fetch.post("/api/account/logout");
      router.push("/logout");
    },
    register: async (user) => {
      try {
        await fetch.post("/api/account/register", user);
        alertService.success("Registration successful", true);
        router.push("/login");
      } catch (error) {
        alertService.error(error);
      }
    },
    getAll: async () => {
      userStore.setState({ users: await fetch.get("/api/users") });
    },
    getById: async (id) => {
      userStore.setState({ user: undefined });
      try {
        userStore.setState({ user: await fetch.get(`/api/users/${id}`) });
      } catch (error) {
        alertService.error(error);
      }
    },
    getCurrent: async () => {
      if (!currentUser) {
        userStore.setState({
          currentUser: await fetch.get("/api/users/current"),
        });
      }
    },
    create: async (user) => {
      await fetch.post("/api/users", user);
    },
    update: async (id, params) => {
      await fetch.put(`/api/users/${id}`, params);
      if (id === currentUser?.id) {
        userStore.setState({ currentUser: { ...currentUser, ...params } });
      }
    },
    delete: async (id) => {
      userStore.setState({
        users: users.map((user) => {
          if (user.id === id) {
            user.isDeleting = true;
          }
          return user;
        }),
      });

      const response = await fetch.delete(`/api/users/${id}`);
      userStore.setState({ users: users.filter((user) => user.id !== id) });
      if (response.deletedSelf) {
        router.push("/login");
      }
    },
  };
}
