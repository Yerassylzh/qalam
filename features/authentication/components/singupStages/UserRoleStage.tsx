import RadioInput from "@/components/RadioInput";
import Image from "next/image";
import { useSignupContext } from "../../context/SignupContext";

export default function UserRoleStage() {
  const { userRole, setUserRole } = useSignupContext();

  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <div className="flex md:flex-row flex-col">
        <div className="md:w-[250px] flex-1">
          <div className="w-full flex justify-between items-center">
            <Image
              src="/regularUser.svg"
              alt="U"
              width={32}
              height={32}
              unoptimized
            />
            <RadioInput
              isChecked={userRole === "user"}
              onChange={() => {
                setUserRole("user");
              }}
            />
          </div>
          <p className="text-[16px]">
            Я обычный пользователь, интересующийся новостями.
          </p>
        </div>
      </div>
    </div>
  );
}
