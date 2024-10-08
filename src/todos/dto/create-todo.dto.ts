import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '할일 제목',
    example: '빨래 하기',
    default: '제목 없음',
    minimum: 3,
    maximum: 10,
  })
  @IsString({
    message: '제목은 문자열만 가능합니다',
  })
  @MinLength(3, {
    message: '제목은 $constraint1 자 이상 작성해주세요. 입력된 글자: $value',
  })
  @MaxLength(10, {
    message: '제목은 $constraint1 자 이상 작성할 수 없습니다. 입력된 글자: $value',
  })
  title: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: '할일 완료 여부',
    example: 'false',
    default: false,
  })
  @IsBoolean({
    message: 'Boolean 타입만 가능합니다',
  })
  isDone: boolean;
}
