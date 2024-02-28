import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient;

export const seed = async() => {
  try {
      await db();
      const admin = await prisma.patient.create({
      data: {
          id: 'c828301b-2d77-440f-9ca6-396fb679d9d1',
          full_name: 'Admin',
          password: 'password',
          email: 'admin@example.com'
      },
      });
      console.log('Seeded admin: ', admin);
  } catch (ex) {
      console.error('Error during seeding: ', ex);
      throw ex; 
  } finally {
      await disconnect();
  }   
}

export const db = async() => {
    try {
        await prisma.$connect();
        console.log('🔌 Database connected..');
    } catch (ex) {
        console.log('Error connecting to Database: ', ex);
    }    
}

export const disconnect = async() => {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database Disconnected..');
    } catch (ex) {
      console.log('Error disconnecting Database: ', ex);
    }
}


