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
  healthCondition: z.string().min(2).max(50),
  selfDiagnosed: z.string().min(2).max(50),
  medications: z.string().min(2).max(50),
});

export type StepTwoFormSchema = z.infer<typeof formSchema>;

interface StepTwoProps {
  handleSubmitData: (data: z.infer<typeof formSchema>) => void;
  handleBack: () => void;
}

const StepTwo: FunctionComponent<StepTwoProps> = ({
  handleSubmitData,
  handleBack,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthCondition: "",
      selfDiagnosed: "",
      medications: "",
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
          name="healthCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have any existing health conditions?</FormLabel>
              <FormControl>
                <Input
                  placeholder="List everything — I’m not shy!"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selfDiagnosed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are any of these self-diagnosed?</FormLabel>
              <FormControl>
                <Input placeholder="Mention which" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you taking any medications?</FormLabel>
              <FormControl>
                <Input placeholder="Birth control counts, too!" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={handleBack} variant="secondary">
          Previous
        </Button>
        <Button type="submit">Move to daily check-in</Button>
      </form>
    </Form>
  );
};

export default StepTwo;
