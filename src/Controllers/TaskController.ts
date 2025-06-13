import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller('tasks')
export default class TaskController {
  constructor(
  private readonly saveTaskUseCase: SaveTaskUseCase,
  private readonly useCaseFactory: UseCaseFactory
) {}

  @Get()
  async getAll() {
const tasks = await (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  return {
    success: true,
    data: tasks,
    message: 'Tasks retrieved successfully',
  };
}

  @Post()
  async create(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
     const task = await this.saveTaskUseCase.handle(dto);
  return {
    success: true,
    data: task,
    message: 'Task successfully created',
  };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    dto.id = Number(id);  // Inject l'id dans le DTO pour le save
    const updateTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
    const updatedTask = await updateTaskUseCase.handle(dto);
    return {
      success: true,
      data: updatedTask,
      message: 'Task successfully updated',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}