"use client";

import React from "react";
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
  }

  return (
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
        {/* DO BUTTONS NOW */}
        <Button type="submit">Log it!</Button>
      </form>
    </Form>

    // <>
    //   <h2>What did you have?</h2>

    //   <div className="flex">
    //     <Input
    //       className="w-154"
    //       type="text"
    //       placeholder="Describe your food — the more details, the better"
    //     />
    //     <Button>Log it!</Button>
    //   </div>
    // </>
  );
};

export default FormLogIntake;
