import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { BuyersService } from 'src/buyers/buyers.service';
import { JwtPayload } from 'src/utils/types/jwt-payload';

@Injectable()
export class JwtRefreshBuyerStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-buyer',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly buyersService: BuyersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies['refreshToken'];
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
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
