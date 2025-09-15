"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/user";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const CARBS_CALORIES_PER_GRAM = 4;
const PROTEIN_CALORIES_PER_GRAM = 4;
const FATS_CALORIES_PER_GRAM = 9;

const formSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.email(),
    password: z.string().min(12).max(50),
    confirmPassword: z.string().min(12).max(50),
    calorieGoal: z.number().int(),
    carbsGoal: z.number().int(),
    proteinGoal: z.number().int(),
    fatsGoal: z.number().int(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // to attach error message to confirmPassword field
  });

const FormRegistration = () => {
  const queryClient = useQueryClient();
  const fetchData = useFetch();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const addNewUser = async (data) => {
    try {
      const res = await fetchData("/api/register", "PUT", {
        // FOR USER DETAILS
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        // FOR CALORIE_GOAL
        calorie_goal: data.calorieGoal,
        carbohydrates_goal: data.carbsGoal,
        protein_goal: data.proteinGoal,
        fats_goal: data.fatsGoal,
      });

      if (res.ok) {
        userContext.setAccessToken(res.data.access);
        navigate("/main");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // THOUGHT PROCESS FOR handleCalorieInputs AND handleMacroInputs:
  // when user changes value on calories input, the states "carbs", "protein", and "fats" will change and hence the values on carbs, protein, and fats will update in real time
  // when user changes values on carbs, protein, or fats, the state "calories" will change and update the value on the calories input
  const handleCalorieInputs = (event) => {
    const calories = Number(event.target.value);
    const carbs = Math.round((calories * 0.55) / CARBS_CALORIES_PER_GRAM);
    const protein = Math.round((calories * 0.2) / PROTEIN_CALORIES_PER_GRAM);
    const fats = Math.round((calories * 0.25) / FATS_CALORIES_PER_GRAM);

    form.setValue("calorieGoal", calories);
    form.setValue("carbsGoal", carbs);
    form.setValue("proteinGoal", protein);
    form.setValue("fatsGoal", fats);
  };

  const handleMacroInputs = (event) => {
    const inputValue = Number(event.target.value);
    form.setValue(event.target.name, inputValue);

    const values = form.getValues();
    const newTotalCalories = Math.round(
      CARBS_CALORIES_PER_GRAM * values.carbsGoal +
        PROTEIN_CALORIES_PER_GRAM * values.proteinGoal +
        FATS_CALORIES_PER_GRAM * values.fatsGoal
    );

    form.setValue("calorieGoal", newTotalCalories);
  };

  // FOR THE FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      calorieGoal: 0,
      carbsGoal: 0,
      proteinGoal: 0,
      fatsGoal: 0,
    },
  });

  const calorieGoal = form.watch("calorieGoal");

  // HANDLE onSubmit
  function onSubmit(values) {
    console.log(values);
    addNewUser(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* sr-only — to hide the header for aesthetics but want it to be picked up on screen readers */}
                  <FormLabel className="sr-only">First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
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
                        handleCalorieInputs(event);
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
            <p>{calorieGoal}</p>

            <span>kcal / day</span>
          </div>

          <div>
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
                        onChange={(event) => handleMacroInputs(event)}
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
                      <Input
                        className="w-[75px]"
                        type="number"
                        {...field}
                        onChange={(event) => handleMacroInputs(event)}
                      />
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
                      <Input
                        className="w-[75px]"
                        type="number"
                        {...field}
                        onChange={(event) => handleMacroInputs(event)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
};

export default FormRegistration;
