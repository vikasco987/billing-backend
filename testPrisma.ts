// testPrisma.ts
import prisma from './src/lib/prisma.ts';


async function main() {
  try {
    console.log('--- Prisma + MongoDB Sanity Check ---');

    // 1️⃣ List all categories (or any collection you have)
    const categories = await prisma.category.findMany();
    console.log('Existing categories:', categories);

    // 2️⃣ Create a new test category
    const testCategory = await prisma.category.create({
      data: { name: 'Test Category' },
    });
    console.log('Created test category:', testCategory);

    // 3️⃣ Update test category (optional)
    const updatedCategory = await prisma.category.update({
      where: { id: testCategory.id },
      data: { name: 'Updated Test Category' },
    });
    console.log('Updated test category:', updatedCategory);

    // 4️⃣ Delete test category
    await prisma.category.delete({
      where: { id: testCategory.id },
    });
    console.log('Deleted test category ✅');

  } catch (err) {
    console.error('Prisma test error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
