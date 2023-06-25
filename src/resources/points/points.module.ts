import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsSchema } from './schemas/points.schema';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  controllers: [PointsController],
  providers: [PointsService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Points', schema: PointsSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
})
export class PointsModule {}
