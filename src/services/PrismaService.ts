
import { PrismaClient } from '@prisma/client';

export class PrismaService {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log('🔌 Database connected..');
    } catch (ex) {
      console.log('Error connecting to Database: ', ex);
     
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      console.log('🔌 Database Disconnected..');
    } catch (ex) {
      console.log('Error disconnecting Database: ', ex);
    }
  }

  async seed() {
    try {
      await this.connect();
      const admin = await this.prisma.patient.create({
        data: {
          id: 'c828301b-2d77-440f-9ca6-396fb679d9d1',
          full_name: 'Admin',
          password: 'password',
          email: 'admin@example.com',
        },
      });
      console.log('Seeded admin: ', admin);
    } catch (ex) {
      console.error('Error during seeding: ', ex);
      throw ex; 
    } finally {
      await this.disconnect();
    }
  }
  
}


