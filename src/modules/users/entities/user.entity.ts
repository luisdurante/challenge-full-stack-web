import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  /*
   * ID do usuário (gerado automaticamente)
   * @example ba79d966-e688-491c-ba45-47998c8a1494
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /*
   * Email do usuário
   * @example email@email.com
   */
  @Column({ unique: true })
  email: string;

  /*
   * Nome do usuário
   * @example Fulano da Silva
   */
  @Column()
  name: string;

  /*
   * Senha do usuário
   * @example examplePassword123
   */
  @Column()
  password: string;

  /*
   * Data de nascimento do usuário
   * @example 2000-04-14
   */
  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  /*
   * Data de criação do usuário (gerado automaticamente)
   * @example 2023-06-15T19:59:27.123Z
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  /*
   * Data de atualização do usuário (gerado automaticamente)
   * @example 2023-06-15T19:59:27.123Z
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
