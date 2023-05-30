import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedUser } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthenticatedUser() user: any,
  ) {
    if (user.sub !== createUserDto.clientId) {
      throw new UnauthorizedException(
        'Not allowed to create a user for another client',
      );
    }

    const client = await this.usersService.findByClientID(
      createUserDto.clientId,
    );
    if (client) {
      throw new BadRequestException(
        `Client with id ${createUserDto.clientId} already exists`,
      );
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('/client/:clientId')
  async findByClientID(@Param('clientId') clientId: string) {
    const client = await this.usersService.findByClientID(clientId);
    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }
    return client;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/generate/:factor')
  generate(@Param('factor') factor: string) {
    const name = this.usersService.generate(factor);
    return { name };
  }
}
