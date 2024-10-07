import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.client';
@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  // model Todo {
  //   id    Int     @id @default(autoincrement())
  //   title String
  //   isDone  Boolean @default(false)
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt
  // }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.isDone,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    return this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.isDone,
      },
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }

  // create(createTodoDto: CreateTodoDto) {
  //   return `This action adds a new todo - todo: ${createTodoDto.todo} isDone: ${createTodoDto.isDone}`;
  // }

  // findAll() {
  //   return `This action returns all todos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} todo`;
  // }

  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return `This action updates a #${id} - todo: ${updateTodoDto.title} isDone: ${updateTodoDto.isDone}`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} todo`;
  // }
}
