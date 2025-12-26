import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'backup_file',
})
@Index('IDX__backup_file__backup_id', ['backupId'])
@Index('IDX__backup_file__file_id', ['fileId'])
@Index('IDX__backup_file__name', ['name'])
@Index('IDX__backup_file__external_id', ['externalId'])
export class BackupFile {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__backup_file',
  })
  id: string;

  @Column({ name: 'backup_id', type: 'uuid', nullable: false })
  backupId: string;

  @Column({ name: 'file_id', type: 'uuid', nullable: false })
  fileId: string;

  @Column({ name: 'name', length: '4096', nullable: false })
  name: string;

  @Column({ name: 'serial_id', type: 'bigint', nullable: true })
  serialId: number | null = null;

  @Column({ name: 'external_id', length: '512', nullable: true })
  externalId: string | null = null;

  @Column({ name: 'start_time', type: 'timestamp', nullable: true })
  startTime: Date | null = null;

  @Column({ name: 'completion_time', type: 'timestamp', nullable: true })
  completionTime: Date | null = null;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

