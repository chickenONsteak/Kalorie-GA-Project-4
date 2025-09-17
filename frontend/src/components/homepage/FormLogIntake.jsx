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
import UserContext from "../../contexts/user";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

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
  const userContext = useContext(UserContext);
  const queryClient = useQueryClient();

  const addIntake = async (openAiResponse) => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData("/intakes/add_intake", "PUT", {
        user_id: decoded.user_id,
        food_name: openAiResponse.food_name,
        calories: openAiResponse.calories,
        carbohydrates: openAiResponse.carbohydrates_g,
        protein: openAiResponse.protein_g,
        fats: openAiResponse.fats_g,
        assumption_1: openAiResponse?.assumptions[0] ?? "",
        assumption_2: openAiResponse?.assumptions[1] ?? "",
        assumption_3: openAiResponse?.assumptions[2] ?? "",
        additional_details_required_1:
          openAiResponse?.required_details[0] ?? "",
        additional_details_required_2:
          openAiResponse?.required_details[1] ?? "",
        additional_details_required_3:
          openAiResponse?.required_details[2] ?? "",
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["getTodayIntakes"] }); // TO RE-RENDER THE TableIntake COMPONENT
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCalorieEstimate = async (data) => {
    try {
      const res = await fetchData("/openai/estimate_calories", "PUT", {
        food_description: data.foodInput,
      });

      if (res.ok) {
        // ADD INTO DATABASE
        addIntake(res.data.output);
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
    </>
  );
};

export default FormLogIntake;
