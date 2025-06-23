import { prisma } from "@/lib/prisma";

async function main() {
  const sections = [
    {
      name: "Общество и актуальные темы",
      icon: "🪐",
      interests: [
        "Политика",
        "Экономика",
        "Общество",
        "Международные отношения",
        "Культура народов",
      ],
    },
    {
      name: "Технологии и знания",
      icon: "💡",
      interests: [
        "Технологии",
        "Наука",
        "Образование и саморазвитие",
        "Искусственный интеллект",
        "Программирование",
      ],
    },
    {
      name: "Личная жизнь и увлечения",
      icon: "❤️",
      interests: [
        "Спорт",
        "Музыка",
        "Кино и сериалы",
        "Путешествия",
        "Здоровье и фитнес",
        "Кулинария",
      ],
    },
  ];

  for (const section of sections) {
    const createdSection = await prisma.userInterestSection.upsert({
      where: { name: section.name },
      update: {},
      create: {
        name: section.name,
        icon: section.icon,
      },
    });

    for (const interestName of section.interests) {
      await prisma.userInterest.upsert({
        where: { name: interestName },
        update: {},
        create: {
          name: interestName,
          sectionId: createdSection.id,
        },
      });
    }
  }

  console.log("✅ Interests and sections seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
