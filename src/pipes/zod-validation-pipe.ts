import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

// função para validar entradas de variaveis no zod
// pela a camada de http. No pipe passamos a criação
// dessa instancia para validar o schema de atributos da rota.
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          status: 400,
          error: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
