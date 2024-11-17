"use client";

import { useState } from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companySize: "",
    industry: "",
    useCase: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.companySize;
      case 3:
        return formData.industry && formData.useCase;
      default:
        return true;
    }
  };

  const handleSubmitData = (data: any) => {
    // Do something with the data
    console.log({ stepData: data });

    // Move to next step
    handleNext();
  };

  return (
    <Card className="w-[550px] mx-auto">
      <CardHeader>
        <CardTitle>Asterisk Daily Check</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <StepOne
            handleSubmitData={handleSubmitData}
            handleBack={handlePrevious}
          />
        )}

        {step === 2 && (
          <StepTwo
            handleSubmitData={handleSubmitData}
            handleBack={handlePrevious}
          />
        )}

        {step === 3 && (
          <StepThree
            handleSubmitData={handleSubmitData}
            handleBack={handlePrevious}
          />
        )}

        {/* {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => updateFormData("industry", value)}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="useCase">Primary Use Case</Label>
              <Input
                id="useCase"
                placeholder="Describe your primary use case"
                value={formData.useCase}
                onChange={(e) => updateFormData("useCase", e.target.value)}
              />
            </div>
          </div>
        )} */}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Summary</h3>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Company Size:</strong> {formData.companySize}
            </p>
            <p>
              <strong>Industry:</strong> {formData.industry}
            </p>
            <p>
              <strong>Primary Use Case:</strong> {formData.useCase}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={step === 4 || !isStepComplete()}>
          {step === 3 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
