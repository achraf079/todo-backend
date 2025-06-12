import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(status?: string): Promise<Task[]> {
    if (status === 'completed') {
      return this.tasksRepository.find({ where: { completed: true } });
    }
    if (status === 'pending') {
      return this.tasksRepository.find({ where: { completed: false } });
    }
    return this.tasksRepository.find({ order: { createdAt: 'DESC' } });
  }

  // @todo CRÉER UNE TÂCHE ✅
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.tasksRepository.save(task);
  }

  // @todo MODIFIER UNE TÂCHE ✅
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    Object.assign(task, updateTaskDto);
    task.updatedAt = new Date();
    
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // BONUS
  async toggleComplete(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.completed = !task.completed;
    task.updatedAt = new Date();
    return this.tasksRepository.save(task);
  }
}
