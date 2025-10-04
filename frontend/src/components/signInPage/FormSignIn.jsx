"use client";

import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/user";
import { useNavigate } from "react-router";
import { Spinner } from "../ui/shadcn-io/spinner";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(50),
});

const FormSignIn = () => {
  const fetchData = useFetch();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = async (data) => {
    try {
      const res = await fetchData("/api/sign_in", "POST", {
        email: data.email,
        password: data.password,
      });

      if (res.ok) {
        userContext.setAccessToken(res.data.access);
        localStorage.setItem("access_token", res.data.access);
        navigate("/main");
      } else {
        form.setError("password", {
          type: "manual",
          message: res.message || "Invalid email or password",
        });
      }
    } catch (error) {
      form.setError("password", {
        type: "manual",
        message: error.message || "Something went wrong",
      });
    }
  };

  // FOR FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    signIn(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Spinner variant={"default"} />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FormSignIn;
