import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class RedisService extends RedisPubSub implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      connection: {
        host: configService.getOrThrow('REDIS_HOST'),
        port: Number(configService.getOrThrow('REDIS_PORT')),
        username: configService.getOrThrow('REDIS_USERNAME'),
        password: configService.getOrThrow('REDIS_PASSWORD'),
        db: Number(configService.getOrThrow('REDIS_DB')),
      },
    });
  }

  async onModuleInit() {}
}
