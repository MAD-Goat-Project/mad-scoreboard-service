import { IsNumber, Length, Max, Min } from 'class-validator';

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
  @Max(0)
  totalPoints: number;
}
