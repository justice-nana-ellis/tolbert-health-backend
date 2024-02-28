const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const seed = async() => {
  try {
      await db();
      const admin = await prisma.admin.delete({
        where: {
            id: '00000000-0000-0000-0000-000000000000',
        }
      });
      console.log('Seeded admin: ', admin);
  } catch (ex) {
      console.error('Error during seeding: ', ex);
      throw ex; 
  } finally {
      await disconnect();
  }   
}


const db = async() => {
    try {
        await prisma.$connect();
        console.log('🔌 Database connected..');
    } catch (ex) {
        console.log('Error connecting to Database: ', ex);
    }    
}

const disconnect = async() => {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database Disconnected..');
    } catch (ex) {
      console.log('Error disconnecting Database: ', ex);
    }
}

seed();

