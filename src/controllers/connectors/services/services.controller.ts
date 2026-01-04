import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { PaginationResultDto } from "../../../fsarch/pagination/dto/pagination-result.dto.js";
import { ConnectorDto } from "../../../models/connector.dto.js";

@ApiTags('connector')
@ApiExtraModels(PaginationResultDto, ConnectorDto)
@Controller({
  path: 'connectors/:connectorId/services',
  version: '1',
})
@ApiBearerAuth()
export class ServicesController {

}
