import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
