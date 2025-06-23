"use client";

import Navbar from "@/features/authentication/components/Navbar";
import UserInfoStage from "@/features/authentication/components/singupStages/UserInfoStage";
import UserInterestsStage from "@/features/authentication/components/singupStages/UserInterestsStage";
import UserRoleStage from "@/features/authentication/components/singupStages/UserRoleStage";
import { useSignupContext } from "@/features/authentication/context/SignupContext";

export default function SignupStagePage() {
  const { signupStage } = useSignupContext();

  const stageComponents = {
    role: <UserRoleStage />,
    interests: <UserInterestsStage />,
    info: <UserInfoStage />,
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      {stageComponents[signupStage]}
    </div>
  );
}
