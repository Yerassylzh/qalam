import { UserInterestSection } from "@/types/user";
import { useEffect, useState } from "react";
import { getInterestSections } from "../lib/actions/actions";

export function useInterestSections() {
  const [interestSections, setInterestSections] = useState<
    UserInterestSection[]
  >([]);

  useEffect(() => {
    const wrapper = async () => {
      setInterestSections(await getInterestSections());
    };
    wrapper();
  }, []);

  return interestSections;
}
