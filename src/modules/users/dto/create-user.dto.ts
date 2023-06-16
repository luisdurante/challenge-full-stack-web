import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  /*
   * Email do usuário
   * @example email@email.com
   */
  @IsEmail()
  readonly email: string;

  /*
   * Nome do usuário
   * @example Fulano da Silva
   */
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /*
   * Senha do usuário
   * @example examplePassword123
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /*
   * Data de nascimento do usuário
   * @example 2000-04-14
   */
  @IsISO8601()
  @IsNotEmpty()
  readonly birthDate: Date;
}
