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
  healthStatus: z.string().min(2).max(50),
  doctorVisit: z.string().min(2).max(50),
  updateMedications: z.string().min(2).max(50),
});

export type StepThreeFormSchema = z.infer<typeof formSchema>;

interface StepThreeProps {
  handleSubmitData: (data: z.infer<typeof formSchema>) => void;
  handleBack: () => void;
}

const StepThree: FunctionComponent<StepThreeProps> = ({
  handleSubmitData,
  handleBack,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthStatus: "",
      doctorVisit: "",
      updateMedications: "",
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
          name="healthStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hey, how is your health today? </FormLabel>
              <FormControl>
                <Input
                  placeholder="You can reply with text, voice, or video"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doctorVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Did you see a doctor today?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="updateMedications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Do you need to update conditions/medications?{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={handleBack} variant="secondary">
          Previous
        </Button>
        <Button type="submit">Receive a point!</Button>
      </form>
    </Form>
  );
};

export default StepThree;
