import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'warn'],
    })
  }

  onModuleDestroy() {
    return this.$disconnect()
  }

  onModuleInit() {
    return this.$connect()
  }
}
