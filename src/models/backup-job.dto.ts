import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsInt, Min, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsCronExpression } from '../validators/is-cron.decorator.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBackupJobDto {
  @ApiProperty({ maxLength: 512 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  connectorServiceId: string;

  @ApiProperty({ description: 'Cron expression' })
  @IsNotEmpty()
  @IsString()
  @IsCronExpression({ message: 'cronExpression must be a valid cron string' })
  cronExpression: string;

  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeoutSeconds?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateBackupJobDto {
  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @ApiPropertyOptional({ description: 'Cron expression' })
  @IsOptional()
  @IsString()
  @IsCronExpression({ message: 'cronExpression must be a valid cron string' })
  cronExpression?: string;

  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeoutSeconds?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class BackupJobDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  connectorServiceId: string;

  @ApiProperty({ description: 'Cron expression' })
  @Expose()
  cronExpression: string;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  nextExecutionTime?: Date | null;

  @ApiPropertyOptional({ type: 'integer' })
  @Expose()
  timeoutSeconds?: number | null;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiPropertyOptional({ maxLength: 512 })
  @Expose()
  externalId?: string | null;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Expose()
  creationTime: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @Expose()
  deletionTime?: Date | null;
}
