import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'connector',
})
@Index('IDX__connector__external_id', ['externalId'])
export class Connector {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__connector',
  })
  id: string;

  @Column({ name: 'name', length: '512', nullable: false })
  name: string;

  @Column({ name: 'url', length: '4096', nullable: false })
  url: string;

  @Column({ name: 'secret', length: '1024', nullable: false })
  secret: string;

  @Column({ name: 'external_id', length: '512', nullable: true })
  externalId: string | null = null;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

