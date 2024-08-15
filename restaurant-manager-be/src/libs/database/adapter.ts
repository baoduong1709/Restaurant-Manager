import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ChangeStream, ChangeStreamDocument, DeleteResult } from 'mongodb';
import {
  Aggregate,
  AggregateOptions,
  FilterQuery,
  HydratedDocument,
  MergeType,
  MongooseBulkWriteOptions,
  PipelineStage,
  QueryOptions,
  QueryWithHelpers,
  Require_id,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

import {
  ConnectionModel,
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from './types';

export abstract class IDataBaseService {
  abstract getDefaultConnection<T = MongooseModuleOptions>(
    options?: ConnectionModel,
  ): T;
}

export abstract class IRepository<T> {
  abstract isConnected(): Promise<void>;

  abstract create<T = SaveOptions>(
    document: object,
    saveOptions?: T,
  ): Promise<CreatedModel>;

  abstract findById(id: string | number): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract count<TQuery = FilterQuery<T>>(filter?: TQuery): Promise<number>;

  abstract find<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions | null,
  ): Promise<T[]>;

  abstract remove<TQuery = FilterQuery<T>>(
    filter: TQuery,
  ): Promise<RemovedModel>;

  abstract findOne<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions,
  ): Promise<T>;

  abstract updateOne<
    TQuery = FilterQuery<T>,
    TUpdate = UpdateQuery<T> | UpdateWithAggregationPipeline,
    TOptions = QueryOptions<T>,
  >(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions,
  ): Promise<UpdatedModel>;

  abstract findOneAndUpdate<
    TQuery = FilterQuery<T>,
    TUpdate = UpdateQuery<T>,
    TOptions = QueryOptions<T>,
  >(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions,
  ): Promise<UpdatedModel>;

  abstract updateMany<
    TQuery = FilterQuery<T>,
    TUpdate = UpdateQuery<T> | UpdateWithAggregationPipeline,
    TOptions = QueryOptions<T>,
  >(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions,
  ): Promise<UpdatedModel>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract bulkWrite(
    writes: Array<any>,
    options?: MongooseBulkWriteOptions,
  ): Promise<unknown>;

  abstract aggregate<T>(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<Aggregate<Array<T>>>;

  abstract deleteOne<T>(
    filter: FilterQuery<T>,
  ): Promise<QueryWithHelpers<DeleteResult, T>>;

  abstract watch(): ChangeStream<unknown, ChangeStreamDocument<unknown>>;

  abstract insertMany(
    documents: object[],
    saveOptions?: SaveOptions,
  ): Promise<
    HydratedDocument<
      MergeType<MergeType<T, object[]>, Require_id<T>>,
      object,
      object
    >[]
  >;
}
