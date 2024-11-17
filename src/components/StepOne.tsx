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
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.string(),
  ethnicity: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
});

interface StepOneProps {
  handleSubmitData: (data: z.infer<typeof formSchema>) => void;
  handleBack: () => void;
}

const StepOne: FunctionComponent<StepOneProps> = ({
  handleSubmitData,
  handleBack,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      ethnicity: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    handleSubmitData(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your name?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How old are you?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your age" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your ethnicity?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your ethnicity" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your location?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your country" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={handleBack} variant="secondary">
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};

export default StepOne;