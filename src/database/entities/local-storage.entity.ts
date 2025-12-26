import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Storage } from './storage.entity.js';

@Entity({
  name: 'local_storage',
})
export class LocalStorage {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__local_storage',
  })
  id: string;

  @OneToOne(() => Storage)
  @JoinColumn({ name: 'id' })
  storage: Storage;

  @Column({
    name: 'path',
    length: '4096',
    nullable: false,
  })
  path: string;
}

