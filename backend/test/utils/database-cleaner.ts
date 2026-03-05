import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseCleaner {
  constructor(private readonly dataSource: DataSource) {}

  async clean(): Promise<void> {
    const entities = this.dataSource.entityMetadatas;
    const tableNames = entities
      .map((entity) => `"${entity.tableName}"`)
      .join(', ');

    if (tableNames.length > 0) {
      await this.dataSource.query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`);
    }
  }
}
