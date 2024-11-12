import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SellersService } from 'src/sellers/sellers.service';
import { JwtPayload } from 'src/utils/types/jwt-payload';

@Injectable()
export class JwtAccessSellerStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-seller',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly sellersService: SellersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ userId }: JwtPayload) {
    const seller = await this.sellersService.findOne(userId, null);
    if (!seller) {
      throw new UnauthorizedException();
    }
    return seller;
  }
}
