import { IsString, IsNotEmpty, IsBoolean, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChoiceDto {
  @IsString({message: 'Le texte du choix doit être une chaîne de caractères.'})
  @IsNotEmpty({message: 'Le texte du choix ne doit pas être vide.'})
  text: string;
}

export class CreatePollDto {
  @IsString({'message': 'Le titre doit être une chaîne de caractères.'})
  @IsNotEmpty({'message': 'Le titre ne doit pas être vide.'})
  title: string;

  @IsString({'message': 'La description doit être une chaîne de caractères.'})
  @IsNotEmpty({'message': 'La description ne doit pas être vide.'})
  description: string;

  @IsBoolean({'message': 'Le choix unique doit être un booléen.'})
  singleChoice: boolean;

  @ValidateNested({ each: true, message: 'Chaque choix doit être valide.' })
  @Type(() => ChoiceDto)
  @ArrayMinSize(2, { message: 'Il doit y avoir au moins deux choix.' })
  choices: ChoiceDto[];
}
