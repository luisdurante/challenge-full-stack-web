import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
