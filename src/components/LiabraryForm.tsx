"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createLibrary } from "@/lib/actions/library.actions";
import { redirect } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  topic: z.string().min(1, "Topic is required"),
  subject: z.string().min(1, "Subject is required"),
  voice: z.string().min(1, "Voice is required"),
  style: z.string().min(1, "Style is required"),
  duration: z.number().min(1, "Duration is required"),
});

export default function LiabraryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      topic: "",
      subject: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const library = await createLibrary(data);

    if (library) {
      redirect(`/liabrary/${library.id}`);
    } else {
      console.log("Failed to Create library");
      redirect("/");
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Card className="w-full sm:max-w-md ">
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Name of Liabrary
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter library name"
                      autoComplete="on"
                      className="input"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Subject */}
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-subject">
                      Subject of Liabrary
                    </FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem
                            value={subject}
                            key={subject}
                            className="capitalize"
                          >
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Topic */}
              <Controller
                name="topic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      What should be the topic of the library?
                    </FieldLabel>

                    <Textarea
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg. Introduction to Algebra, Basics of Programming, etc."
                      autoComplete="on"
                      className="input"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Voice */}
              <Controller
                name="voice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-subject">
                      Voice of Instructor
                    </FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input ">
                        <SelectValue placeholder="Select the voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* style */}
              <Controller
                name="style"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-subject">
                      Style of Instruction
                    </FieldLabel>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input ">
                        <SelectValue placeholder="Select the style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Duration */}
              <Controller
                name="duration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Duration of Session
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="select the duration in minutes"
                      autoComplete="on"
                      className="input"
                      type="number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        {/* Submit Button */}
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button
              type="submit"
              form="form-rhf-demo"
              className="cursor-pointer"
            >
              Create Library
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
