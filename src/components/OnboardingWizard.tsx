"use client";

import { useState } from "react";
import StepOne, { StepOneFormSchema } from "./StepOne";
import StepThree, { StepThreeFormSchema } from "./StepThree";
import StepTwo, { StepTwoFormSchema } from "./StepTwo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type UserDataSchema = Partial<
  StepOneFormSchema & StepTwoFormSchema & StepThreeFormSchema
>;

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserDataSchema>();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitData = (data: any, step: number) => {
    // Do something with the data
    console.log("STEP DATA", { stepData: data });
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));

    // Move to next step
    handleNext();

    // Final step
    if (step === 3) {
      // SUBMITTING FINAL DATA
      console.log("Submitting Final Data");
      console.log({ userData });
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Asterisk Daily Check</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <StepOne
            handleSubmitData={(data) => handleSubmitData(data, 1)}
            handleBack={handlePrevious}
          />
        )}

        {step === 2 && (
          <StepTwo
            handleSubmitData={(data) => handleSubmitData(data, 2)}
            handleBack={handlePrevious}
          />
        )}

        {step === 3 && (
          <StepThree
            handleSubmitData={(data) => handleSubmitData(data, 3)}
            handleBack={handlePrevious}
          />
        )}
      </CardContent>
    </Card>
  );
}
