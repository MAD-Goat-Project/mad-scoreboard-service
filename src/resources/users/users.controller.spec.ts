import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        clientId: 'test',
        totalPoints: 0,
      };

      const createdUser = new User();
      jest.spyOn(userModel.prototype, 'save').mockResolvedValue(createdUser);
      jest
        .spyOn(usersService, 'findByClientID')
        .mockResolvedValue(createdUser as UserDocument);
      jest
        .spyOn(usersService, 'update')
        .mockResolvedValue(createdUser as UserDocument);

      const result = await usersController.create(createUserDto, {
        sub: createUserDto.clientId,
      });

      expect(result).toBe(createdUser);
    });

    it('should update existing user for the same client', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        clientId: 'test',
        totalPoints: 0,
      };

      const existingUser = new User();
      jest
        .spyOn(usersService, 'findByClientID')
        .mockResolvedValue(existingUser as UserDocument);
      jest
        .spyOn(usersService, 'update')
        .mockResolvedValue(existingUser as UserDocument);

      const result = await usersController.create(createUserDto, {
        sub: createUserDto.clientId,
      });

      expect(result).toBe(existingUser);
    });

    it('should throw UnauthorizedException when trying to create user for another client', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        clientId: 'test',
        totalPoints: 0,
      };

      await expect(
        usersController.create(createUserDto, {
          sub: 'differentClientID',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should return a mind-blowing array of users', async () => {
      const users = [new User(), new User()];
      jest
        .spyOn(usersService, 'findAll')
        .mockResolvedValue(users as UserDocument[]);

      const result = await usersController.findAll();

      expect(result).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should fetch a user by unleashing its ID', async () => {
      const userId = '1';
      const user = new User();
      jest
        .spyOn(usersService, 'findOne')
        .mockResolvedValue(user as UserDocument);

      const result = await usersController.findOne(userId);

      expect(result).toBe(user);
    });
  });
  describe('findByClientID', () => {
    it('should conjure a user with the sacred client ID', async () => {
      const clientId = 'testClient';
      const user = new User();
      jest
        .spyOn(usersService, 'findByClientID')
        .mockResolvedValue(user as UserDocument);

      const result = await usersController.findByClientID(clientId);

      expect(result).toBe(user);
    });

    it('should summon the mighty NotFoundException if the user eludes us', async () => {
      const clientId = 'nonExistentClient';
      jest.spyOn(usersService, 'findByClientID').mockResolvedValue(null);

      await expect(usersController.findByClientID(clientId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
