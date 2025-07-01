"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Please enter a valid password.",
  }),
});

export default function FormSignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
    // Handle login logic here
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-black text-[0.8125rem] font-semibold leading-[1.4] flex gap-0">
                  Email{" "}
                  <span className="text-[#EA3434] text-[1rem] font-medium leading-[1.2] -tracking-[0.03rem]">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    className="rounded-[0.5rem] h-[3.25rem] py-0 px-4 text-[0.875rem] font-semibold leading-normal text-black placeholder:text-[#A9A9A9] outline-none focus:outline-none focus-visible:border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-black text-[0.8125rem] font-semibold leading-[1.4] flex gap-0">
                  Password{" "}
                  <span className="text-[#EA3434] text-[1rem] font-medium leading-[1.2] -tracking-[0.03rem]">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-[0.5rem] h-[3.25rem] py-0 px-4 text-[0.875rem] font-semibold leading-normal text-black placeholder:text-[#A9A9A9] outline-none focus:outline-none focus-visible:border-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-[1.25rem] text-[#223B66]" />
                      ) : (
                        <EyeOff className="size-[1.25rem] text-[#223B66]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className="h-[2.7rem] w-full bg-blue-500 rounded-[0.5rem] relative flex items-center justify-center mt-6">
            <span className="text-white">Log in</span>
          </button>
        </form>
      </Form>
    </div>
  );
}

export const FormSignInCode = `
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function FormSignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
    // Handle login logic here
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-black text-[0.8125rem] font-semibold leading-[1.4] flex gap-0">
                  Email{" "}
                  <span className="text-[#EA3434] text-[1rem] font-medium leading-[1.2] -tracking-[0.03rem]">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    className="rounded-[0.5rem] h-[3.25rem] py-0 px-4 text-[0.875rem] font-semibold leading-normal text-black placeholder:text-[#A9A9A9] outline-none focus:outline-none focus-visible:border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-black text-[0.8125rem] font-semibold leading-[1.4] flex gap-0">
                  Password{" "}
                  <span className="text-[#EA3434] text-[1rem] font-medium leading-[1.2] -tracking-[0.03rem]">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-[0.5rem] h-[3.25rem] py-0 px-4 text-[0.875rem] font-semibold leading-normal text-black placeholder:text-[#A9A9A9] outline-none focus:outline-none focus-visible:border-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-[1.25rem] text-[#223B66]" />
                      ) : (
                        <EyeOff className="size-[1.25rem] text-[#223B66]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className="h-[2.7rem] w-full bg-blue-500 rounded-[0.5rem] relative flex items-center justify-center mt-6">
            <span className="text-white">Log in</span>
          </button>
        </form>
      </Form>
    </div>
  );
}
`;
