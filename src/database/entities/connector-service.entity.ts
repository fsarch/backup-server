import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';

@Entity({
  name: 'connector_service',
})
@Index('IDX__connector_service__connector_service_id', ['connectorServiceId'])
@Index('IDX__connector_service__connector_id', ['connectorId'])
export class ConnectorService {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__connector_service',
  })
  id: string;

  @Column({ name: 'connector_id', type: 'uuid', nullable: false })
  connectorId: string;

  @Column({ name: 'connector_service_id', length: '1024', nullable: false })
  connectorServiceId: string;

  @Column({ name: 'name', length: '512', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'creation_time', type: 'timestamp' })
  creationTime: Date;

  @DeleteDateColumn({ name: 'deletion_time', type: 'timestamp' })
  deletionTime: Date | null = null;
}

