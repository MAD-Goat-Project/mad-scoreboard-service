import { IsNumber, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(1, 20)
  name: string;

  /**
   *The clientId is a unique identifier from Keycloak. Is the client subject from the token.
   **/
  @Length(1, 100)
  clientId: string;

  @IsNumber()
  @Min(0)
  points: number;
}
