import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBackupDto {
  @ApiPropertyOptional({ maxLength: 512 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 512)
  name: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  connectorServiceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  storageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  timeoutSeconds: number;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class BackupDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  connectorServiceId: string;

  @ApiProperty()
  @Expose()
  storageId: string;

  @ApiPropertyOptional()
  @Expose()
  backupJobId?: string | null;

  @ApiPropertyOptional({ maxLength: 512 })
  @Expose()
  externalId?: string | null;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  startTime?: Date | null;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  completionTime?: Date | null;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Expose()
  creationTime: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  deletionTime?: Date | null;
}

