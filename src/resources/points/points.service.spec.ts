import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PointsService } from './points.service';
import { Model } from 'mongoose';

describe('PointsService', () => {
  let service: PointsService;
  let pointsModel: Model<any>;
  let userModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PointsService>(PointsService);
    pointsModel = module.get<Model<any>>(getModelToken('Points'));
    userModel = module.get<Model<any>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more test cases for the PointsService here
});
