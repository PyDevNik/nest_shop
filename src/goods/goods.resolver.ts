import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { GoodsService } from './goods.service';
import { Good } from './entities/good.entity';
import { CreateGoodInput } from './dto/create-good.input';
import { UpdateGoodInput } from './dto/update-good.input';
import { RedisService } from 'redis/redis.service';
import { LocalSellerGuard } from 'src/auth/guards/local-seller.guard';
import { ForbiddenException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurrentSeller } from 'src/utils/decorators/current-seller.decorator';

@Resolver(() => Good)
export class GoodsResolver {
  constructor(
    private readonly goodsService: GoodsService,
    private readonly redisService: RedisService,
  ) {}

  @UseGuards(LocalSellerGuard)
  @Mutation(() => Good)
  async createGood(
    @CurrentSeller('id', ParseIntPipe) sellerId: number,
    @Args('createGoodInput') createGoodInput: CreateGoodInput,
  ) {
    return await this.goodsService.create(createGoodInput, sellerId);
  }

  @Query(() => [Good], { name: 'goods' })
  async findAll() {
    return await this.goodsService.findAll();
  }

  @Query(() => Good, { name: 'good' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.goodsService.findOne(id);
  }

  @UseGuards(LocalSellerGuard)
  @Mutation(() => Good)
  async updateGood(
    @CurrentSeller('id', ParseIntPipe) sellerId: number,
    @Args('updateGoodInput') updateGoodInput: UpdateGoodInput,
  ) {
    const good = await this.goodsService.findOne(updateGoodInput.id);
    if (good.sellerId != sellerId) {
      throw new ForbiddenException("You don't have enough permissions!");
    }
    return this.goodsService.update(updateGoodInput.id, updateGoodInput);
  }

  @UseGuards(LocalSellerGuard)
  @Mutation(() => Good)
  async removeGood(
    @CurrentSeller('id', ParseIntPipe) sellerId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    const good = await this.goodsService.findOne(id);
    if (good.sellerId != sellerId) {
      throw new ForbiddenException("You don't have enough permissions!");
    }
    return await this.goodsService.remove(id);
  }

  @Subscription(() => Good, { resolve: (payload) => payload })
  async goodAdded() {
    return await this.redisService.asyncIterator('goodAdded');
  }
}
