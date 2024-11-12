import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BuyersService } from 'src/buyers/buyers.service';
import { JwtPayload } from 'src/utils/types/jwt-payload';

@Injectable()
export class JwtAccessBuyerStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-buyer',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly buyersService: BuyersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ userId }: JwtPayload) {
    const buyer = await this.buyersService.findOne(userId, null);
    if (!buyer) {
      throw new UnauthorizedException();
    }
    return buyer;
  }
}
