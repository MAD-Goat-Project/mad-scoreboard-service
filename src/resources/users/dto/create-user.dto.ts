import { IsNumber, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(1, 20)
  name: string;

  @Length(1, 100)
  clientId: string;

  @IsNumber()
  @Min(0)
  points: number;
}
