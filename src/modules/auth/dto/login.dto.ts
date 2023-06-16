export class LoginDto {
  /*
   * Email do usuário que possui acesso ao serviço
   * @example email@email.com
   */
  readonly email: string;

  /*
   * Senha do usuário que possui acesso ao serviço
   * @example examplePassword123
   */
  readonly password: string;
}
