import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PollsService } from './polls.service';
import { Poll } from 'src/entities/poll.entity';

@Controller('polls')
export class PollsController {
    constructor(private readonly pollsService: PollsService) { }

    //sondage test
    @Post('firstSondage')
    create() {
        return this.pollsService.firstPoll();
    }

    @Get()
    getAll() {
        return this.pollsService.findAll();
    }

    @Post()
    createPoll(@Body() pollData: Partial<Poll>) {
        return this.pollsService.createPoll(pollData);
    }


    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.pollsService.deletePoll(Number(id));
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.pollsService.findOne(Number(id));
    }

    @Post(':id/vote')
    vote(@Param('id', ParseIntPipe) id: number, @Body() body: { choiceIds: number[] }) {
        return this.pollsService.vote(id, body.choiceIds);
    }
}
