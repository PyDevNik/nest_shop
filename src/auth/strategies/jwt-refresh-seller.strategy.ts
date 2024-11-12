import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { SellersService } from 'src/sellers/sellers.service';
import { JwtPayload } from 'src/utils/types/jwt-payload';

@Injectable()
export class JwtRefreshSellerStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-seller',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly sellersService: SellersService,
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
    const seller = await this.sellersService.findOne(userId, null);
    if (!seller) {
      throw new UnauthorizedException();
    }
    return seller;
  }
}
