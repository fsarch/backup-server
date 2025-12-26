export class CreateBackupJobDto {
  name: string;
  connectorServiceId: string;
  cronExpression: string;
  timeoutSeconds?: number | null;
  isActive?: boolean;
  externalId?: string | null;
}

export class UpdateBackupJobDto {
  name?: string;
  cronExpression?: string;
  timeoutSeconds?: number | null;
  isActive?: boolean;
  externalId?: string | null;
}

export class BackupJobDto {
  id: string;
  name: string;
  connectorServiceId: string;
  cronExpression: string;
  nextExecutionTime?: Date | null;
  timeoutSeconds?: number | null;
  isActive: boolean;
  externalId?: string | null;
  creationTime: Date;
  deletionTime?: Date | null;
}

