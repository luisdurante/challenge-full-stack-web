import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { databaseConfiguration } from './common/constants';
import { AuthModule } from './modules/auth/auth.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
    UsersModule,
    AuthModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
