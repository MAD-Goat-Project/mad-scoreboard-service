import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    if (isNaN(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
