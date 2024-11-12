import { Module } from '@nestjs/common';
import { GoodsModule } from './goods/goods.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SellersModule } from './sellers/sellers.module';
import { BuyersModule } from './buyers/buyers.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'redis/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,

      // # DEV
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),

    // Extensions
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    PrismaModule,
    JwtModule,

    // App modules
    GoodsModule,
    SellersModule,
    BuyersModule,
    AuthModule,
  ],
})
export class AppModule {}
