import { prisma } from "@/lib/prisma";
import { todayQuests } from "./Seeders/today-quest";

async function main() {
  const todayQuestSeed = todayQuests;
  console.log("Seeding daily quests...");
  for (const quest of todayQuestSeed) {
    // 💡 非同期処理の完了を待つために `await` を追加
    await prisma.mstTodaysQuest.upsert({
      where: { title: quest.title },
      update: {
        type: quest.type,
        point: quest.point,
        level: quest.level,
        timer: quest.timer,
        description: quest.description,
        icon: quest.icon,
        category: quest.category,
      },
      create: {
        title: quest.title,
        type: quest.type,
        point: quest.point,
        level: quest.level,
        timer: quest.timer,
        description: quest.description,
        icon: quest.icon,
        category: quest.category,
      },
    });
  }
  console.log("Daily quests seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });