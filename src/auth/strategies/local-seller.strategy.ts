import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalSellerStrategy extends PassportStrategy(
  Strategy,
  'local-seller',
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const seller = this.authService.validateSeller(email, password);
    if (!seller) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return seller;
  }
}
