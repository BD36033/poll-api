import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class VoteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  choiceIds: number[];
}
