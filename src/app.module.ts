import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'polls.db',
      autoLoadEntities: true,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
