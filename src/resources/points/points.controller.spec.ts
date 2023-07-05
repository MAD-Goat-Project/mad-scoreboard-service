import { Test, TestingModule } from '@nestjs/testing';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  // Add more test cases for the PointsController here
});
