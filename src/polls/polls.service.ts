import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Choice } from 'src/entities/choice.entity';
import { Poll } from 'src/entities/poll.entity';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollsService implements OnModuleInit {
    constructor(
        @InjectRepository(Poll) private pollRepo: Repository<Poll>,
        @InjectRepository(Choice) private choiceRepo: Repository<Choice>,
    ) { }

    async onModuleInit() {
        const count = await this.pollRepo.count();
        if (count === 0) {
            await this.firstPoll();
        }
    }

    async firstPoll() {
        const poll = this.pollRepo.create({
            title: "Dites-vous pain au chocolat ou chocolatine ?",
            description: "Team sud-ouest ou pas ?",
            singleChoice: true,
            choices: [
                { text: "Pain au chocolat" },
                { text: "Chocolatine" },
            ],
        });
        return this.pollRepo.save(poll);
    }

    async findAll() {
        return this.pollRepo.find({ relations: ['choices'] });
    }


    async createPoll(pollData: CreatePollDto) {
            const choices = pollData.choices?.map(choice => this.choiceRepo.create(choice)) || [];
            const poll = this.pollRepo.create({
                title: pollData.title,
                description: pollData.description,
                singleChoice: pollData.singleChoice,
                choices,
            });
            return this.pollRepo.save(poll);
        }

    async findOne(id: number) {
            return this.pollRepo.findOne({
                where: { id },
                relations: ['choices']
            });
        }

    async deletePoll(id: number) {
            const poll = await this.pollRepo.findOne({
                where: { id },
                relations: ['choices']
            });
            if (!poll) return { message: 'Sondage introuvable' };

            await this.pollRepo.remove(poll);
            return { message: 'Sondage supprimé avec succès' };
        }

    async vote(id: number, choiceIds: number[]) {
            const poll = await this.pollRepo.findOne({
                where: { id },
                relations: ['choices']
            });
            if (!poll) return { message: 'Sondage introuvable' };

            if (poll.singleChoice && choiceIds.length > 1) {
                throw new Error('Ce sondage ne permet qu\'un seul choix.');
            }

            for (const choice of poll.choices) {
                if (choiceIds.includes(choice.id)) {
                    choice.votes += 1;
                    await this.choiceRepo.save(choice);
                }
            }
            return { message: 'Vote enregistré avec succès' };
        }
    }
