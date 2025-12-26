export class CreateStorageDto {
  storageTypeId: string;
  name: string;
  externalId?: string | null;
}

export class UpdateStorageDto {
  name?: string;
  externalId?: string | null;
}

export class StorageDto {
  id: string;
  storageTypeId: string;
  name: string;
  externalId?: string | null;
  creationTime: Date;
  deletionTime?: Date | null;
}

