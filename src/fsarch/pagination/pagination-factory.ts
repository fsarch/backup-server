import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Factory that creates a concrete Pagination DTO class for a given item type.
export function createPaginationDto(ItemType: any) {
  const itemName = ItemType?.name ?? 'Item';
  const className = `PaginationResultOf${itemName}`;

  class PaginationResultDto {
    @ApiProperty({ type: [ItemType] })
    data: any[];

    @ApiPropertyOptional({ type: 'integer' })
    total?: number;

    @ApiPropertyOptional({ type: 'integer' })
    page?: number;

    @ApiPropertyOptional({ type: 'integer' })
    pageSize?: number;
  }

  // set class name for nicer Swagger output
  Object.defineProperty(PaginationResultDto, 'name', { value: className });
  return PaginationResultDto;
}

