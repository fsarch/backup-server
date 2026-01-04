import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { PaginationResultDto } from "../../fsarch/pagination/dto/pagination-result.dto.js";
import { StorageDto } from "../../models/storage.dto.js";

@ApiTags('backup')
@ApiExtraModels(PaginationResultDto, StorageDto)
@Controller({
  path: 'backups',
  version: '1',
})
@ApiBearerAuth()
export class BackupsController {

}
