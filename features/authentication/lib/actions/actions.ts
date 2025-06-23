"use server";

import { prisma } from "@/lib/prisma";
import { UserInterestSection } from "@/types/user";

export async function getInterestSections(): Promise<UserInterestSection[]> {
  const sections = await prisma.userInterestSection.findMany({
    include: {
      interests: {
        select: {
          id: true,
          name: true,
          sectionId: true,
        },
      },
    },
  });
  return sections as unknown as UserInterestSection[];
}
