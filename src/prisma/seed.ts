const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const seed = async() => {
  try {
      await db();
      const admin = await prisma.admin.create({
        data: {
            access_level: 'super_admin',
            full_name: 'Inventory',
            email: 'inventory.@tolberthealth.com',
            password: '$2b$10$wQItRcbkIlREABuuvnnCJ.FmuQ8/wnM7zykNy0DsYZL6YUx5V3V6O' //-Admin@123!
  }});
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
    } catch (error) {
        console.log('⚠️ Error connecting to Database..');
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

