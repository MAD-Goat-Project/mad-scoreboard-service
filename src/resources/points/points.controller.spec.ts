import { Test, TestingModule } from '@nestjs/testing';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RmqContext } from '@nestjs/microservices';

describe('PointsController', () => {
  let controller: PointsController;
  let pointsService: PointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsController],
      providers: [
        PointsService,
        {
          provide: getModelToken('Points'),
          useValue: Model,
        },
        {
          provide: getModelToken('User'),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<PointsController>(PointsController);
    pointsService = module.get<PointsService>(PointsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNotifications', () => {
    it('should log the received message and update points', () => {
      const payload = { assessmentId: 1, userId: 'testUserId' };
      const context: Partial<RmqContext> = {
        getMessage: jest.fn().mockReturnValue(payload),
      };
      const updatePointsSpy = jest
        .spyOn(pointsService, 'updatePoints')
        .mockResolvedValue(undefined as never); // This is an awful hack and should be fixed

      controller.getNotifications(payload, context as RmqContext);

      expect(updatePointsSpy).toHaveBeenCalledWith(payload);
    });
  });
});
