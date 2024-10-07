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
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo-dto';
import { ResponseDto } from './dto/response.dto';
import { GenericApiResponse } from './decorators/generic-api-response-decorator';

// @UseInterceptors(LoggingInterceptor) // 컨트롤러 하나당 interceptor
@ApiTags('todos')
@ApiExtraModels(ResponseDto)
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
  // @ApiHeader({
  //   name: 'todos',
  //   description: '스웨거헤더',
  // })
  // @ApiOkResponse({ description: '성공적으로 할일이 추가되었습니다', type: TodoDto })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    summary: '할일 추가하기',
    description: '할일을 추가한다.',
  })
  @GenericApiResponse({
    status: 200,
    description: '성공적으로 할일이 추가되었습니다',
    model: TodoDto,
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createdTodo;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일 목록을 가져왔습니다')
  // @ApiOkResponse({ description: '성공적으로 할일 목록을 가져왔습니다', type: TodoDto, isArray: true })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    summary: '할일 목록 가져오기',
    description: '할일 목록을 가져온다.',
  })
  // @ApiResponse({
  //   status: 200,
  //   description: '성공적으로 할일 목록을 가져왔습니다',
  //   schema: {
  //     allOf: [
  //       { $ref: getSchemaPath(ResponseDto) },
  //       {
  //         properties: {
  //           data: {
  //             type: 'array',
  //             items: { $ref: getSchemaPath(TodoDto) },
  //           },
  //         },
  //       },
  //     ],
  //   },
  // })
  @GenericApiResponse({
    status: 200,
    description: '성공적으로 할일 목록을 가져왔습니다',
    model: TodoDto,
    isArray: true,
  })
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
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    summary: '단일 할일 가져오기',
    description: '해당 할일을 조회한다.',
  })
  @GenericApiResponse({
    status: 200,
    description: '성공적으로 단일 할일을 가져왔습니다',
    model: TodoDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const foundTodo = await this.todosService.findOne(+id);
    if (!foundTodo) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return foundTodo;
  }

  @Post(':id')
  @HttpCode(200)
  @ResponseMsg('성공적으로 해당 할 일이 수정되었습니다')
  // @ApiOkResponse({ description: '성공적으로 할일을 수정했습니다', type: TodoDto, isArray: false })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    summary: '할일 수정하기',
    description: '단일 할일을 수정한다.',
  })
  @GenericApiResponse({
    description: '성공적으로 해당 할 일이 수정되었습니다',
    model: TodoDto,
  })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const updateTodo = await this.todosService.update(+id, updateTodoDto);
    if (!updateTodo) {
      throw new HttpException('No data', HttpStatus.NOT_FOUND);
    }
    return updateTodo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 해당 할 일이 삭제 되었습니다')
  @ApiOkResponse({ description: '성공적으로 할일 목록 삭제했습니다', type: TodoDto, isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({
    summary: '할일 삭제하기',
    description: '단일 할일을 삭제한다.',
  })
  @GenericApiResponse({
    description: '성공적으로 해당 할 일이 삭제 되었습니다',
    model: TodoDto,
  })
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (!foundTodo) {
      throw new HttpException('해당 할일이 존재하지 않습니다', HttpStatus.NOT_FOUND);
    }

    const deletedTodo = await this.todosService.remove(+id);

    return deletedTodo;
  }
}
