import { UserInterest } from "@/types/user";
import { useSignupContext } from "../../context/SignupContext";
import ArrowGreenButton from "../form/ArrowGreenButton";
import useToggle from "@/hooks/useToggle";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function InterestOption({ interest }: { interest: UserInterest }) {
  const { setInterests } = useSignupContext();
  const [isSelected, toggleSelected] = useToggle(false);

  const toggleInterest = useCallback(
    (name: string) => {
      const prevIsSelected = isSelected;

      setInterests((prev: string[]) => {
        if (prevIsSelected) {
          return prev.filter((n) => n !== name);
        } else {
          return [...prev, name];
        }
      });
      toggleSelected();
    },
    [isSelected, setInterests, toggleSelected]
  );

  return (
    <button
      onClick={() => toggleInterest(interest.name)}
      className={cn(
        "px-3 py-1 text-sm rounded-full border transition cursor-pointer",
        isSelected
          ? "bg-green-100 border-green-400 text-green-800"
          : "bg-gray-100 border-gray-300 text-gray-700"
      )}
    >
      {interest.name}
    </button>
  );
}

export function ContinueButton() {
  const { setSignupStage, interests } = useSignupContext();

  return (
    <div className="w-full flex items-center justify-center">
      <ArrowGreenButton
        onClick={() => {
          if (interests.length === 0) {
            toast.error("Выберите хоть одну категорию");
          } else {
            setSignupStage("info");
          }
        }}
        text="Продолжить"
        className=""
      />
    </div>
  );
}
