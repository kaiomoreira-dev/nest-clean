import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthenticateController } from './controllers/authenticate.controller'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    // configurando leitura de variavel de ambiente global
    // pelo validate pegamos cada env e passamos no schema para converter
    // o ConfigModule é uma configuração do nest para configurar variaveis ambiente
    // na aplicação.
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  // sempre importamos os controller nos controllers
  controllers: [CreateAccountController, AuthenticateController],
  // sempre improtamos os Services ou Providers no providers
  providers: [PrismaService, JwtService],
})
export class AppModule {}
