import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Points } from './schemas/points.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Points.name) private pointsModel: Model<Points>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // TODO: Improve types
  updatePoints(data: { assessmentId: number; userId: string }) {
    this.userModel.updateOne(
      { clientId: data.userId },
      { $inc: { totalPoints: 10 } },
    );
  }
}
