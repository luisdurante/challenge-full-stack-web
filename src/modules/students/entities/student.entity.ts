import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  /*
   * Registro de matricula do aluno (gerado automaticamente)
   * @example 0000001
   */
  @PrimaryColumn()
  ra: string;

  /*
   * Email do aluno
   * @example email@email.com
   */
  @Column()
  email: string;

  /*
   * Nome do aluno
   * @example Fulano da Silva
   */
  @Column()
  name: string;

  /*
   * CPF do aluno (Precisa ser um CPF válido e ter apenas números)
   * @example 35377764030
   */
  @Column({ unique: true })
  cpf: string;

  /*
   * Data de criação do aluno (gerado automaticamente)
   * @example 2023-06-15T19:59:27.123Z
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  /*
   * Data de atualização do aluno (gerado automaticamente)
   * @example 2023-06-15T19:59:27.123Z
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
