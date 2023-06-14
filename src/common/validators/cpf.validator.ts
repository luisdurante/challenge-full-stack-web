import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
@Injectable()
export class CpfValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return cpf.isValid(value);
  }
  defaultMessage(args: ValidationArguments) {
    return `Cpf must be a valid cpf.`;
  }
}
