import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsInt, Min, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateBackupJobDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @IsNotEmpty()
  @IsString()
  connectorServiceId: string;

  @IsNotEmpty()
  @IsString()
  cronExpression: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeoutSeconds?: number | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateBackupJobDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @IsOptional()
  @IsString()
  cronExpression?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeoutSeconds?: number | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class BackupJobDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  connectorServiceId: string;

  @Expose()
  cronExpression: string;

  @Expose()
  nextExecutionTime?: Date | null;

  @Expose()
  timeoutSeconds?: number | null;

  @Expose()
  isActive: boolean;

  @Expose()
  externalId?: string | null;

  @Expose()
  creationTime: Date;

  @Expose()
  deletionTime?: Date | null;
}
