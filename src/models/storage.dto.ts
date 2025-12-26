import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateStorageDto {
  @IsNotEmpty()
  @IsString()
  storageTypeId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class UpdateStorageDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  externalId?: string | null;
}

export class StorageDto {
  @Expose()
  id: string;

  @Expose()
  storageTypeId: string;

  @Expose()
  name: string;

  @Expose()
  externalId?: string | null;

  @Expose()
  creationTime: Date;

  @Expose()
  deletionTime?: Date | null;
}
