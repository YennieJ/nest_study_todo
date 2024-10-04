import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  // Res,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Response } from 'express';
import { ResponseMsg } from './decorators/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';

// @UseInterceptors(LoggingInterceptor) // 컨트롤러 하나당 interceptor
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // @HttpCode(HttpStatus.OK) // 상태 코드 변경시 HttpStatus.OK or Number
  // create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) { //함수 하나당 validationPipe
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  // @Post()
  // @HttpCode(HttpStatus.OK)
  // // async 비동기 처리해야 데이터를 처리할 수 있음
  // async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
  //   const createdTodo = await this.todosService.create(createTodoDto);
  //   // res.status(HttpStatus.CREATED).send(); // express 처리 방식 HttpCode(HttpStatus.OK)처리 없을 땐 201 반환.  json 반환값 없음
  //   res.status(HttpStatus.CREATED).json({
  //     message: '성공적으로 할일이 추가되었습니다',
  //     statusCode: 200,
  //     data: createdTodo,
  //   });
  // }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일이 추가되었습니다')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createdTodo;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일 목록을 가져왔습니다')
  async findAll() {
    const foundAllTodo = await this.todosService.findAll();

    if (!foundAllTodo) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return foundAllTodo;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일을 가져왔습니다')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const foundTodo = await this.todosService.findOne(+id);
    if (!foundTodo) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return foundTodo;
  }

  @Post(':id')
  @HttpCode(200)
  @ResponseMsg('해당 할 일이 수정되었습니다')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const updateTodo = await this.todosService.update(+id, updateTodoDto);
    if (!updateTodo) {
      throw new HttpException('No data', HttpStatus.NOT_FOUND);
    }
    return updateTodo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('해당 할 일이 삭제 되었습니다')
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (!foundTodo) {
      throw new HttpException('해당 할일이 존재하지 않습니다', HttpStatus.NOT_FOUND);
    }

    const deletedTodo = await this.todosService.remove(+id);

    return deletedTodo;
  }
}
