import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { DatabaseCleaner } from './database-cleaner';
import { StandardizedResponseInterceptor } from '../../src/shared/infrastructure/interceptors/standardized-response.interceptor';
import { GlobalExceptionFilter } from '../../src/shared/infrastructure/filters/global-exception.filter';

export class TestAppInstance {
  private static _instance: TestAppInstance;
  private _app: INestApplication;
  private _module: TestingModule;
  private _databaseCleaner: DatabaseCleaner;

  static async getInstance(): Promise<INestApplication> {
    if (!TestAppInstance._instance) {
      TestAppInstance._instance = new TestAppInstance();
      await TestAppInstance._instance.init();
    }
    return TestAppInstance._instance.app;
  }

  static async closeInstance(): Promise<void> {
    if (TestAppInstance._instance) {
      await TestAppInstance._instance.close();
      TestAppInstance._instance = null as any;
    }
  }

  private async init(): Promise<void> {
    this._module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseCleaner],
    }).compile();

    this._app = this._module.createNestApplication();

    // Replicar configurações do main.ts
    this._app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    this._app.useGlobalInterceptors(new StandardizedResponseInterceptor());
    this._app.useGlobalFilters(new GlobalExceptionFilter());

    await this._app.init();

    const dataSource = this._app.get(DataSource);
    await dataSource.synchronize(); // Garante que as tabelas existam para o teste
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
