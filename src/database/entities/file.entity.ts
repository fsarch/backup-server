import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'file',
})
@Index('IDX__file__storage_id', ['storageId'])
@Index('IDX__file__duplicated_file_id', ['duplicatedFileId'])
@Index('IDX__file__storage_id__md5__no_duplicated', ['storageId', 'md5'])
@Index('IDX__file__external_id', ['externalId'])
export class FileEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__file',
  })
  id: string;

  @Column({ name: 'storage_id', type: 'uuid', nullable: false })
  storageId: string;

  @Column({ name: 'md5', length: '32', nullable: true })
  md5: string | null = null;

  @Column({ name: 'duplicated_file_id', type: 'uuid', nullable: true })
  duplicatedFileId: string | null = null;

  @Column({ name: 'path', length: '4096', nullable: false })
  path: string;

  @Column({ name: 'external_id', length: '512', nullable: true })
  externalId: string | null = null;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

