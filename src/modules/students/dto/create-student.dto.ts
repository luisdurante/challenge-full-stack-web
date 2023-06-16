import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { CpfValidator } from '../../../common/validators/cpf.validator';

export class CreateStudentDto {
  /*
   * Email do aluno
   * @example email@email.com
   */
  @IsEmail()
  readonly email: string;

  /*
   * Nome do aluno
   * @example Fulano da Silva
   */
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /*
   * CPF do aluno (Precisa ser um CPF válido e ter apenas números)
   * @example 35377764030
   */
  @IsNotEmpty()
  @Validate(CpfValidator)
  @Matches(/^[0-9]*$/, {
    message: 'Cpf field only accepts numbers',
  })
  readonly cpf: string;
}
