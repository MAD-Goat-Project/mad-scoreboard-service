import { Controller } from '@nestjs/common';
import { PointsService } from './points.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @EventPattern('lesson.completed')
  getNotifications(
    @Payload() data: { assessmentId: number; userId: string },
    @Ctx() context: RmqContext,
  ) {
    this.pointsService.updatePoints(data);
  }
}
