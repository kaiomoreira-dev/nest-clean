import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    rawBody: true,
  })

  // injetando um modulo da nossa aplicação que no caso é o ConfigService,
  // nele estamos importando as configurações das variáveis de ambiente.
  // E estamos tipando do tipo ConfigService<Env> que são do tipo Env o arquivo
  // que contémt o schema com as variaveis de ambiente do nosso sistema. Ao
  // passar um inferencia no nest precisamos passar como segundo aprametro o true
  // no parâmetro do generic e um objeto com { infer:true } no get da variável buscada
  // no caso o PORT pois o nest entende que todas variaveis podem sr undefinied.
  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
