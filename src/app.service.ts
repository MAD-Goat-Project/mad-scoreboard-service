import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  madScoreBoard(): string {
    return 'Welcome to MAD Scoreboard!';
  }
}
