import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const authSessionUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthSessionUser = z.infer<typeof authSessionUser>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: '19d5723c-0dee-462c-9f32-8eb4347bfb65' })

    console.log(token)

    return token
  }
}
