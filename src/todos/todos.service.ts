import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  create(createTodoDto: CreateTodoDto) {
    return `This action adds a new todo - todo: ${createTodoDto.todo} is_done: ${createTodoDto.is_done}`;
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} - todo: ${updateTodoDto.todo} is_done: ${updateTodoDto.is_done}`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
