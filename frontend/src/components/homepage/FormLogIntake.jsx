"use client";

import React, { useContext, useState } from "react";
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
import useFetch from "../../hooks/useFetch";
import NewIntakeContext from "../../contexts/newIntake";

const CONFIDENCE_THRESHOLD = 0.8;

const formSchema = z.object({
  foodInput: z
    .string()
    .min(1, {
      message: "Input must be at least 1 characters.",
    })
    .max(500, {
      message: "Input cannot exceed 500 characters.",
    }),
});

const FormLogIntake = () => {
  const fetchData = useFetch();
  const newIntakeContext = useContext(NewIntakeContext);

  // const addIntake = async (data) => {

  // }

  const getCalorieEstimate = async (data) => {
    try {
      const res = await fetchData("/openai/estimate_calories", "PUT", {
        food_description: data.foodInput,
      });

      if (res.ok) {
        newIntakeContext.setIntake(res.data.output);
        // ADD INTO DATABASE
        console.log(res);
        console.log(res.data.output);
        console.log(res.data.output.food_name);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // FOR THE FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodInput: "",
    },
  });

  const foodInput = form.watch("foodInput");

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    getCalorieEstimate(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-4">
          <FormField
            control={form.control}
            name="foodInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What did you have?</FormLabel>
                <FormControl>
                  <Input
                    className="w-[400px]"
                    placeholder="Describe your food — the more details, the better"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Log it!</Button>
        </form>
      </Form>
      <p>{JSON.stringify(newIntakeContext.intake)}</p>
    </>
  );
};

export default FormLogIntake;
