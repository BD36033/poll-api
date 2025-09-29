import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from 'src/entities/poll.entity';
import { Choice } from 'src/entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Choice])],
  providers: [PollsService],
  controllers: [PollsController]
})
export class PollsModule {}
