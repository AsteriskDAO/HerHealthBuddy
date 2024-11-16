"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.tsx";

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

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Asterisk Daily Check</CardTitle>
        <CardDescription>Step {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">what should I call you? </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">And how old are you? </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your age"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">What’s your ethnicity? </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your ethnicity"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                And where in the world do you live?{" "}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your location"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>Company Size</Label>
            <RadioGroup
              value={formData.companySize}
              onValueChange={(value) => updateFormData("companySize", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-10" id="r1" />
                <Label htmlFor="r1">1-10 employees</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="11-50" id="r2" />
                <Label htmlFor="r2">11-50 employees</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="51-200" id="r3" />
                <Label htmlFor="r3">51-200 employees</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="201+" id="r4" />
                <Label htmlFor="r4">201+ employees</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        {step === 3 && (
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
        )}

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
