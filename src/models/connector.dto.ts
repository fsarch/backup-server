import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConnectorDto {
  @ApiProperty({ maxLength: 512 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({ maxLength: 1024 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  secret: string;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateConnectorDto {
  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional({ maxLength: 1024 })
  @IsOptional()
  @IsString()
  @Length(1, 1024)
  secret?: string;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class ConnectorDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  url: string;

  @ApiPropertyOptional()
  @Expose()
  externalId: string | null;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Expose()
  creationTime: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  deletionTime?: Date | null;
}
