import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalBuyerStrategy extends PassportStrategy(
  Strategy,
  'local-buyer',
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const buyer = this.authService.validateBuyer(email, password);
    if (!buyer) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return buyer;
  }
}
