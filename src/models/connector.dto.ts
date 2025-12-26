import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateConnectorDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  secret: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateConnectorDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  @Length(1, 1024)
  secret?: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class ConnectorDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  url: string;

  @Expose()
  externalId: string | null;

  @Expose()
  creationTime: Date;

  @Expose()
  deletionTime?: Date | null;
}
