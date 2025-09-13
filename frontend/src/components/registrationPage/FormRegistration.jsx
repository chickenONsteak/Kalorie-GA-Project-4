"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    givenName: z.string().min(1).max(50),
    familyName: z.string().min(1).max(50),
    email: z.email(),
    password: z.string().min(12).max(50),
    confirmPassword: z.string().min(12).max(50),
    calorieGoal: z.int(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // to attach error message to confirmPassword field
  });

const FormRegistration = () => {
  // const [calories, setCalories] = useState(0);
  // const [carbs, setCarbs] = useState(0);
  // const [protein, setProtein] = useState(0);
  // const [fats, setFats] = useState(0);

  // FOR THE FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenName: "",
      familyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      calorieGoal: 0,
      carbsGoal: 0,
      proteinGoal: 0,
      fatsGoal: 0,
    },
  });

  // HANDLE onSubmit
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex">
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem>
                  {/* sr-only — to hide the header for aesthetics but want it to be picked up on screen readers */}
                  <FormLabel className="sr-only">Given name</FormLabel>
                  <FormControl>
                    <Input placeholder="Given name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Family name</FormLabel>
                  <FormControl>
                    <Input placeholder="Family name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* divider */}
          <div className="border-b-1 my-8"></div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your Kalorie account
                </FormDescription>
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
                  <Input
                    type="password"
                    placeholder="Password (min. 12 char long)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* divider */}
          <div className="border-b-1 my-8"></div>

          <div className="flex flex-row items-center">
            <FormField
              control={form.control}
              name="calorieGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Let's set your caloric goal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Calories per day"
                      {...field}
                      onChange={(event) => {
                        // // THOUGHT PROCESS:
                        // // when user changes value on calories input, the states "carbs", "protein", and "fats" will change and hence the values on carbs, protein, and fats will update in real time
                        // // when user changes values on carbs, protein, or fats, the state "calories" will change and update the value on the calories input
                        // setCalories(Number(event.target.value));
                        // setCarbs(calories * 0.55);
                        // setProtein(calories * 0.2);
                        // setFats(calories * 0.25);
                        // field.onChange(calories);
                        field.onChange(Number(event.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Not sure what your goal should be? Check out{" "}
                    <a
                      className="text-blue-500"
                      href="https://www.calculator.net/calorie-calculator.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      calorie calculator
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span>kcal / day</span>
          </div>

          {/* <div>
            <p>
              <span className="font-bold">Alternatively</span>, you can set by
              macros:
            </p>

            <div className="flex">
              <FormField
                control={form.control}
                name="carbsGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[75px]"
                        type="number"
                        {...field}
                        onChange={(event) => {
                          setCarbs(Number(event.target.value));
                          field.onChange(carbs);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proteinGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein</FormLabel>
                    <FormControl>
                      <Input className="w-[75px]" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatsGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fats</FormLabel>
                    <FormControl>
                      <Input className="w-[75px]" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}

          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
};

export default FormRegistration;
