import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { ConnectionModel } from './types';
import { IDataBaseService } from './adapter';

@Injectable()
export class DataBaseService implements IDataBaseService {
  getDefaultConnection<T extends MongooseModuleOptions = MongooseModuleOptions>(
    config: ConnectionModel,
  ): T {
    return {
      appName: 'monorepo',
      uri: this.getConnectionString(config),
    } as T;
  }

  private getConnectionString(config: ConnectionModel): string {
    return `${config.mongoDbURI}/${config.dbName}`;
  }
}
