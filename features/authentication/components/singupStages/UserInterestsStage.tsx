import React from "react";
import {
  ContinueButton,
  InterestOption,
} from "./UserInterestsStage.components";
import { UserInterestSection } from "@/types/user";
import { useInterestSections } from "../../hooks/useInterestSections";

export default function InterestSelectionPage() {
  const interestSections = useInterestSections();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg w-full text-center flex flex-col px-4 gap-6">
        <h1 className="text-2xl font-semibold">Выберите свои интересы</h1>

        <div className="space-y-6">
          {interestSections &&
            interestSections.map((section, index) => (
              <InterestSection key={index} section={section} />
            ))}
        </div>
        <ContinueButton />
        <div className="w-full flex items-center justify-center"></div>
      </div>
    </div>
  );
}

export function InterestSection({ section }: { section: UserInterestSection }) {
  return (
    <div key={section.id} className="text-left">
      <h2 className="font-semibold mb-2 flex items-center gap-1">
        <span>{section.icon}</span> {section.name}
      </h2>
      <div className="flex flex-wrap gap-2">
        {section.interests.map((interest, index) => (
          <InterestOption interest={interest} key={index} />
        ))}
      </div>
    </div>
  );
}
