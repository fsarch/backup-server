import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';
import { EStorageType } from "../../constants/enums/EStorageType.js";

export class BaseTables1766748137677 implements MigrationInterface {
  name = 'BaseTables1766748137677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region StorageType
    await queryRunner.createTable(
      new Table({
        name: 'storage_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__storage_type',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.manager.insert('storage_type', {
      id: EStorageType.LOCAL,
      name: 'Local',
    });
    // endregion

    // region Storage
    await queryRunner.createTable(
      new Table({
        name: 'storage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__storage',
          },
          {
            name: 'storage_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__storage__storage_type_id',
          columnNames: ['storage_type_id'],
        }, {
          name: 'IDX__storage__external_id',
          columnNames: ['external_id'],
        }],
        foreignKeys: [{
          name: 'FK__storage__storage_type_id',
          columnNames: ['storage_type_id'],
          referencedTableName: 'storage_type',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion

    // region LocalStorage
    await queryRunner.createTable(
      new Table({
        name: 'local_storage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__local_storage',
          },
          {
            name: 'path',
            type: 'varchar',
            length: '4096',
            isNullable: false,
          },
        ],
        foreignKeys: [{
          name: 'FK__local_storage__id',
          columnNames: ['id'],
          referencedTableName: 'storage',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }],
      }),
    );
    // endregion

    // region Connector
    await queryRunner.createTable(
      new Table({
        name: 'connector',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__connector',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            length: '4096',
            isNullable: false,
          },
          {
            name: 'secret',
            type: 'varchar',
            length: '1024',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__connector__external_id',
          columnNames: ['external_id'],
        }],
      }),
    );
    // endregion

    // region ConnectorService
    await queryRunner.createTable(
      new Table({
        name: 'connector_service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__connector_service',
          },
          {
            name: 'connector_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'connector_service_id',
            type: 'varchar',
            length: '1024',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'UQ__connector_service__connector_id__connector_service_id',
          columnNames: ['connector_id', 'connector_service_id'],
          isUnique: true,
          where: 'deletion_time IS NULL'
        }, {
          name: 'IDX__connector_service__connector_service_id',
          columnNames: ['connector_service_id'],
        }, {
          name: 'IDX__connector_service__connector_id',
          columnNames: ['connector_id'],
        }],
        foreignKeys: [{
          name: 'FK__connector_service__connector_id',
          columnNames: ['connector_id'],
          referencedTableName: 'connector',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion

    // region BackupJob
    await queryRunner.createTable(
      new Table({
        name: 'backup_job',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__backup_job',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'connector_service_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cron_expression',
            type: 'varchar',
            length: '1048',
            isNullable: false,
          },
          {
            name: 'next_execution_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'is_active',
            type: getDataType(databaseType, 'boolean'),
            isNullable: false,
            default: 'true',
          },
          {
            name: 'timeout_seconds',
            type: 'integer',
            isNullable: true,
            default: 3600,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__backup_job__connector_service_id',
          columnNames: ['connector_service_id'],
        }, {
          name: 'IDX__backup_job__external_id',
          columnNames: ['external_id'],
        }],
        foreignKeys: [{
          name: 'FK__backup_job__connector_service_id',
          columnNames: ['connector_service_id'],
          referencedTableName: 'connector_service',
          referencedColumnNames: ['id'],
        }]
      }),
    );
    // endregion

    // region Backup
    await queryRunner.createTable(
      new Table({
        name: 'backup',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__backup',
          },
          {
            name: 'secret',
            type: 'varchar',
            length: '1024',
            isNullable: false,
          },
          {
            name: 'backup_job_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'start_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'last_update_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'completion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__backup__external_id',
          columnNames: ['external_id'],
        }, {
          name: 'IDX__backup__backup_job_id',
          columnNames: ['backup_job_id'],
        }],
        foreignKeys: [{
          name: 'FK__backup__backup_job_id',
          columnNames: ['backup_job_id'],
          referencedTableName: 'backup_job',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion

    // region File
    await queryRunner.createTable(
      new Table({
        name: 'file',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__file',
          },
          {
            name: 'storage_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'md5',
            type: 'varchar',
            length: '32',
            isNullable: true,
          },
          {
            name: 'duplicated_file_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'path',
            type: 'varchar',
            length: '4096',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__file__storage_id',
          columnNames: ['storage_id'],
        }, {
          name: 'IDX__file__duplicated_file_id',
          columnNames: ['duplicated_file_id'],
        }, {
          name: 'IDX__file__storage_id__md5__no_duplicated',
          columnNames: ['storage_id', 'md5'],
          where: 'deletion_time IS NULL AND md5 IS NOT NULL AND duplicated_file_id IS NULL',
        }, {
          name: 'IDX__file__external_id',
          columnNames: ['external_id'],
        }],
        foreignKeys: [{
          name: 'FK__file__storage_id',
          columnNames: ['storage_id'],
          referencedTableName: 'storage',
          referencedColumnNames: ['id'],
        }, {
          name: 'FK__file__duplicated_file_id',
          columnNames: ['duplicated_file_id'],
          referencedTableName: 'file',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion

    // region File
    await queryRunner.createTable(
      new Table({
        name: 'backup_file',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__backup_file',
          },
          {
            name: 'backup_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'file_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '4096',
            isNullable: false,
          },
          {
            name: 'serial_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '512',
            isNullable: true,
          },
          {
            name: 'start_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'completion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [{
          name: 'IDX__backup_file__backup_id',
          columnNames: ['backup_id'],
        }, {
          name: 'IDX__backup_file__file_id',
          columnNames: ['file_id'],
        }, {
          name: 'IDX__backup_file__name',
          columnNames: ['name'],
        }, {
          name: 'IDX__backup_file__external_id',
          columnNames: ['external_id'],
        }],
        foreignKeys: [{
          name: 'FK__backup_file__backup_id',
          columnNames: ['backup_id'],
          referencedTableName: 'backup',
          referencedColumnNames: ['id'],
        }, {
          name: 'FK__backup_file__file_id',
          columnNames: ['file_id'],
          referencedTableName: 'file',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('backup_file');
    await queryRunner.dropTable('file');
    await queryRunner.dropTable('backup');
    await queryRunner.dropTable('backup_job');
    await queryRunner.dropTable('connector_service');
    await queryRunner.dropTable('connector');
    await queryRunner.dropTable('local_storage');
    await queryRunner.dropTable('storage');
    await queryRunner.dropTable('storage_type');
  }
}
