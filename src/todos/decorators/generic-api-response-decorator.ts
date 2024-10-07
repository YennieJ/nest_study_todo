import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

export interface GenericApiResponseOption<TModel extends Type<any>> {
  status?: number;
  description?: string;
  model: TModel;
  isArray?: boolean;
}

export const GenericApiResponse = (option: GenericApiResponseOption<Type>) => {
  const isArray = option.isArray || false;

  if (isArray) {
    return applyDecorators(
      ApiOkResponse({
        status: option.status || 200,
        description: option.description || '성공',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(option.model) },
                },
              },
            },
          ],
        },
      }),
    );
  }
  return applyDecorators(
    ApiOkResponse({
      status: option.status || 200,
      description: option.description || '성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(option.model),
              },
            },
          },
        ],
      },
    }),
  );
};
