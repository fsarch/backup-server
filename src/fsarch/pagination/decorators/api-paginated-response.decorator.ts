import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { createPaginationDto } from '../pagination-factory.js';

export function ApiPaginatedResponse(ItemType: Type<any>) {
  const PaginationDto = createPaginationDto(ItemType);
  return applyDecorators(
    ApiExtraModels(PaginationDto, ItemType),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(PaginationDto),
      },
    }),
  );
}

