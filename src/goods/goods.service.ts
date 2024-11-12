import { Injectable } from '@nestjs/common';
import { CreateGoodInput } from './dto/create-good.input';
import { UpdateGoodInput } from './dto/update-good.input';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'redis/redis.service';
import { Good } from './entities/good.entity';

@Injectable()
export class GoodsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async create(createGoodInput: CreateGoodInput, sellerId: number) {
    const good = await this.prismaService.good.create({
      data: {
        name: createGoodInput.name,
        description: createGoodInput.description,
        price: createGoodInput.price,
        sellerId: sellerId,
      },
    });
    await this.redisService.publish('goodAdded', good);
    return good;
  }

  async findAll() {
    return await this.prismaService.good.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.good.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateGoodInput: UpdateGoodInput) {
    return await this.prismaService.good.update({
      where: { id },
      data: {
        name: updateGoodInput.name,
        description: updateGoodInput.description,
        price: updateGoodInput.price,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.good.delete({
      where: { id },
    });
  }
}
