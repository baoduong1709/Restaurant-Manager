import { Module } from '@nestjs/common';

import { TransformResponseInterceptor } from './interceptor/response.interceptor';

@Module({
  imports: [TransformResponseInterceptor],
})
export class ResponseModule {}
