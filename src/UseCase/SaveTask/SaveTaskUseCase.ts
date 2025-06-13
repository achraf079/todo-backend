import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';
import { UseCase } from '../../index';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
    */
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Name is required');
    }

    if (dto.id) {
      const existingTask = await this.taskRepository.findOne(dto.id);
      if (!existingTask) {
        throw new NotFoundException(`Task with id ${dto.id} not found`);
      }
      return this.taskRepository.update(dto.id, dto);
    } else {
      return this.taskRepository.create(dto);
    }
  }
}
