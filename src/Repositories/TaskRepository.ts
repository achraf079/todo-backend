import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import SaveTaskDto from 'src/UseCase/SaveTask/SaveTaskDto';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async create(dto: SaveTaskDto) {
    return this.prisma.task.create({
      data: {
        name: dto.name,
      },
    });
  }

  async update(id: number, dto: SaveTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
