import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStorageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  storageTypeId: string;

  @ApiProperty({ maxLength: 512 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateStorageDto {
  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class StorageDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  storageTypeId: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @Expose()
  externalId?: string | null;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Expose()
  creationTime: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  deletionTime?: Date | null;
}
