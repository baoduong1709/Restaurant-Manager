import { Module } from '@nestjs/common';

import { ResponseModule } from './response/response.module';

@Module({
  imports: [ResponseModule],
})
export class CommonModule {}
