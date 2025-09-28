import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'polls.db', 
      autoLoadEntities: true, 
      synchronize: true,      
    }),
  ],
})
export class AppModule {}
