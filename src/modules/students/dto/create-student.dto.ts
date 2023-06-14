import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { CpfValidator } from '../../../common/validators/cpf.validator';

export class CreateStudentDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Validate(CpfValidator)
  @Matches(/^[0-9]*$/, {
    message: 'Cpf field only accepts numbers',
  })
  readonly cpf: string;
}
