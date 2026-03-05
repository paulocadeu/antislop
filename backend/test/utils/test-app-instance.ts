import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { DatabaseCleaner } from './database-cleaner';
import { StandardizedResponseInterceptor } from '../src/shared/infrastructure/interceptors/standardized-response.interceptor';
import { GlobalExceptionFilter } from '../src/shared/infrastructure/filters/global-exception.filter';

export class TestAppInstance {
  private _app: INestApplication;
  private _module: TestingModule;
  private _databaseCleaner: DatabaseCleaner;

  static async create(): Promise<TestAppInstance> {
    const instance = new TestAppInstance();
    await instance.init();
    return instance;
  }

  private async init(): Promise<void> {
    this._module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this._app = this._module.createNestApplication();

    // Replicar configurações do main.ts
    this._app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    this._app.useGlobalInterceptors(new StandardizedResponseInterceptor());
    this._app.useGlobalFilters(new GlobalExceptionFilter());

    await this._app.init();

    const dataSource = this._app.get(DataSource);
    this._databaseCleaner = new DatabaseCleaner(dataSource);
  }

  get app(): INestApplication {
    return this._app;
  }

  get module(): TestingModule {
    return this._module;
  }

  async cleanDatabase(): Promise<void> {
    await this._databaseCleaner.clean();
  }

  async close(): Promise<void> {
    await this._app.close();
  }
}
