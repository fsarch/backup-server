import { ApiProperty } from "@nestjs/swagger";

export class PaginationResultDto<T> {
  @ApiProperty({
    isArray: true,
  })
  data: Array<T>
}
