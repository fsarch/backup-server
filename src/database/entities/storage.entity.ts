import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'storage',
})
@Index('IDX__storage__storage_type_id', ['storageTypeId'])
@Index('IDX__storage__external_id', ['externalId'])
export class Storage {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__storage',
  })
  id: string;

  @Column({
    name: 'storage_type_id',
    type: 'uuid',
    nullable: false,
  })
  storageTypeId: string;

  @Column({
    name: 'name',
    length: '512',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '512',
    nullable: true,
  })
  externalId: string | null = null;

  @CreateDateColumn({
    name: 'creation_time',
    type: 'timestamp',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
    type: 'timestamp',
  })
  deletionTime: Date | null = null;
}

