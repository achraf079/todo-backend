import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './PrismaService';
import TaskRepository from './Repositories/TaskRepository';
import SaveTaskUseCase from './UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from './UseCase/UseCaseFactory';
import TaskController from './Controllers/TaskController';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [TaskController],
  providers: [
    PrismaService,
    TaskRepository,
    SaveTaskUseCase,
    UseCaseFactory,
  ],
  exports: [
    PrismaService,
    TaskRepository,
    SaveTaskUseCase,
    UseCaseFactory,
  ],
})
export class AppModule {}