"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "./actions";
import { Button, Input } from "@nextui-org/react";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginFormFields = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const { control, handleSubmit, formState: { errors }} = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="flex flex-col gap-4">
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
      <Button variant="solid" color="primary" type="submit">Login</Button>
    </form>
  );
}

export { LoginForm };
export type { LoginFormFields };
