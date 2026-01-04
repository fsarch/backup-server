import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'backup_job',
})
@Index('IDX__backup_job__connector_service_id', ['connectorServiceId'])
@Index('IDX__backup_job__external_id', ['externalId'])
export class BackupJob {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__backup_job',
  })
  id: string;

  @Column({ name: 'name', length: '512', nullable: false })
  name: string;

  @Column({ name: 'external_id', length: '512', nullable: true })
  externalId: string | null = null;

  @Column({ name: 'connector_service_id', type: 'uuid', nullable: false })
  connectorServiceId: string;

  @Column({ name: 'storage_id', type: 'uuid', nullable: false })
  storageId: string;

  @Column({ name: 'cron_expression', length: '1048', nullable: false })
  cronExpression: string;

  @Column({ name: 'next_execution_time', type: 'timestamp', nullable: true })
  nextExecutionTime: Date | null = null;

  @Column({ name: 'is_active', type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'timeout_seconds', type: 'integer', nullable: true, default: 3600 })
  timeoutSeconds: number | null = 3600;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

