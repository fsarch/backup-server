export class CreateConnectorDto {
  name: string;
  url: string;
  secret: string;
  externalId?: string | null;
}

export class UpdateConnectorDto {
  name?: string;
  url?: string;
  secret?: string;
  externalId?: string | null;
}

export class ConnectorDto {
  id: string;
  name: string;
  url: string;
  externalId: string | null;
  creationTime: Date;
  deletionTime?: Date | null;
}

