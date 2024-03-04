import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const registerAccountUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type RegisterAccountUser = z.infer<typeof registerAccountUser>

@Controller('/users')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  // Decorators para dizer que a rota é POST
  // Que vai retornar um status HTTP 201
  // Um pipe para validar os atributos do schema de registerAccountUser
  // E um body para pegar os dados pelo corpo da requisição
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerAccountUser))
  async handle(@Body() body: RegisterAccountUser) {
    const { name, email, password } = body

    const findEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (findEmailExist) {
      throw new ConflictException('Email already exists')
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }
}
