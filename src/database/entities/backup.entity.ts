import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'backup',
})
@Index('IDX__backup__external_id', ['externalId'])
@Index('IDX__backup__backup_job_id', ['backupJobId'])
export class Backup {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__backup',
  })
  id: string;

  @Column({ name: 'secret', length: '1024', nullable: false })
  secret: string;

  @Column({ name: 'backup_job_id', type: 'uuid', nullable: true })
  backupJobId: string | null = null;

  @Column({ name: 'external_id', length: '512', nullable: true })
  externalId: string | null = null;

  @Column({ name: 'start_time', type: 'timestamp', nullable: true })
  startTime: Date | null = null;

  @Column({ name: 'last_update_time', type: 'timestamp', nullable: true })
  lastUpdateTime: Date | null = null;

  @Column({ name: 'completion_time', type: 'timestamp', nullable: true })
  completionTime: Date | null = null;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

