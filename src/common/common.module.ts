import { Global, Module } from '@nestjs/common';
import { CommonUtil } from './util/common.util';

@Global()
@Module({
  imports: [],
  providers: [CommonUtil],
  exports: [CommonUtil],
})
export class CommonModule {}
