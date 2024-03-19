"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "./actions";
import { Button, Input } from "@nextui-org/react";

const signupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  username: z.string().regex(/[a-z0-9]/).min(4),
});

type SignupFormFields = z.infer<typeof signupFormSchema>;

function SignupForm() {
  const { control, handleSubmit, formState: { errors }} = useForm<SignupFormFields>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => signup(data))} className="flex flex-col gap-4">
      <Controller
        name="username"
        control={control}
        render={({ field }) =>
          <Input
            errorMessage={errors.username?.message}
            label="Username"
            size="sm"
            autoComplete="off"
            type="text"
            {...field}
          />
        }
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) =>
          <Input
            errorMessage={errors.email?.message}
            label="Email"
            size="sm"
            type="email"
            {...field}
          />
        }
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) =>
          <Input
            errorMessage={errors.password?.message}
            label="Password"
            size="sm"
            type="password"
            {...field}
          />
        }
      />
      <Button variant="solid" color="primary" type="submit">Sign Up</Button>
    </form>
  );
}

export { SignupForm };
export type { SignupFormFields };
