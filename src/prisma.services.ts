import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


export class PrismaServices extends PrismaClient implements OnModuleInit{

    async onModuleInit() {
        await this.$connect()
    }

}