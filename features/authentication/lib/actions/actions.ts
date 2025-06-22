"use server";

import { prisma } from "@/lib/prisma";
import { UserInterest, UserInterestSection } from "@/types/user";

export async function linkInterestsToUser(
  userId: number,
  interestNames: string[]
) {
  const interests = (await prisma.userInterest.findMany({
    where: {
      name: { in: interestNames },
    },
    select: {
      id: true,
    },
  })) as UserInterest[];

  if (interests.length === 0) {
    return { success: false, message: "No matching interests found." };
  }

  const linkData = interests.map((interest) => ({
    userId,
    interestId: interest.id,
  }));

  await prisma.userInterestLink.createMany({
    data: linkData,
  });

  return { success: true, linked: linkData.length };
}

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
