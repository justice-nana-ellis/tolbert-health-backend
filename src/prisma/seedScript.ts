import { PrismaService } from '../../src/services';

(async () => {
  const prismaService = new PrismaService();

  try {
    await prismaService.seed();
  } catch (ex) {
    console.error('Error during seeding:', ex);
  } 
})();
