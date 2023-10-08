"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  useAlertService,
  useUserService,
} from "@/app/_services/useAlertService";

export function AddEdit({ title, user }) {
  const router = useRouter();
  const alertService = useAlertService();
  const userService = useUserService();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: user,
  });
  const { errors } = formState;

  const fields = {
    firstName: register("firstName", {
      required: "Your first name is required",
    }),
    lastName: register("lastName", { required: "Your last name is required" }),
    username: register("username", { required: "Username is required" }),
    password: register("password", {
      minLength: {
        value: 8,
        message: "Password must contain at least 8 characters",
      },
      validate: (value) =>
        !user && !value ? "Password is required" : undefined,
    }),
  };
  async function onSubmit(data) {
    alertService.clear();
    try {
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = "User's details updated";
      } else {
        await userService.create(data);
        message = "New user created";
      }
      router.push("/curriculum");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <div>
        <div>
          <label>First name</label>
          <input {...fields.firstName} type="text" />
          <div>{errors.firstName?.message?.toString()}</div>
        </div>
        <div>
          <label>Last name</label>
          <input {...fields.lastName} type="text" />
          <div>{errors.lastName?.message?.toString()}</div>
        </div>
      </div>
      <div>
        <div>
          <label>Username</label>
          <input {...fields.username} type="text" />
          <div>{errors.username?.message?.toString()}</div>
        </div>
        <div>
          <label>
            Password
            {user && <em>(Leave blank to keep the same password)</em>}
          </label>
          <input {...fields.password} type="password" />
          <div>{errors.password?.message?.toString()}</div>
        </div>
      </div>
      <div>
        <button type="submit" disabled={formState.isSubmitting}>
          Save
        </button>
        <button
          onClick={() => reset()}
          type="button"
          disabled={formState.isSubmitting}
        >
          Reset
        </button>
        <Link href="/login">Cancel</Link>
      </div>
    </form>
  );
}
