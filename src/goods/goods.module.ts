import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsResolver } from './goods.resolver';

@Module({
  providers: [GoodsResolver, GoodsService],
  exports: [GoodsService],
})
export class GoodsModule {}
