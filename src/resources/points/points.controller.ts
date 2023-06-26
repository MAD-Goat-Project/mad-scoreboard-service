import { Controller, Logger } from '@nestjs/common';
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
    Logger.log(`Message Received: ${JSON.stringify(data)}`, 'PointsController');
    this.pointsService.updatePoints(data);
  }
}
