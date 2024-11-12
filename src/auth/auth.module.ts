import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BuyersModule } from 'src/buyers/buyers.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessBuyerStrategy } from './strategies/jwt-access-buyer.strategy';
import { JwtAccessSellerStrategy } from './strategies/jwt-access-seller.strategy';
import { JwtRefreshBuyerStrategy } from './strategies/jwt-refresh-buyer.strategy';
import { JwtRefreshSellerStrategy } from './strategies/jwt-refresh-seller.strategy';
import { LocalBuyerStrategy } from './strategies/local-buyer.strategy';
import { LocalSellerStrategy } from './strategies/local-seller.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessBuyerStrategy,
    JwtAccessSellerStrategy,
    JwtRefreshBuyerStrategy,
    JwtRefreshSellerStrategy,
    LocalBuyerStrategy,
    LocalSellerStrategy,
  ],
  imports: [BuyersModule, SellersModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
