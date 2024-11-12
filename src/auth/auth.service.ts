import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { BuyersService } from 'src/buyers/buyers.service';
import { SellersService } from 'src/sellers/sellers.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterDto, res: Response) {
    const hashedPassword = await argon2.hash(user.password);
    let createdUser = null;
    switch (user.type) {
      case 'seller':
        createdUser = await this.sellersService.create({
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: hashedPassword,
        });
        break;
      case 'buyer':
        createdUser = await this.buyersService.create({
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: hashedPassword,
        });
        break;
    }
    if (!createdUser) {
      throw new BadRequestException('Invalid User Type');
    }
    return await this.generateTokens(createdUser.id, res);
  }

  async validateSeller(email: string, password: string) {
    const existingSeller = await this.sellersService.findOne(null, email);
    if (!existingSeller) {
      return null;
    }

    const isValidPw = await argon2.verify(existingSeller.password, password);
    if (!isValidPw) {
      return null;
    }

    return existingSeller;
  }

  async validateBuyer(email: string, password: string) {
    const existingBuyer = await this.buyersService.findOne(null, email);
    if (!existingBuyer) {
      return null;
    }

    const isValidPw = await argon2.verify(existingBuyer.password, password);
    if (!isValidPw) {
      return null;
    }

    return existingBuyer;
  }

  async generateTokens(userId: number, res: Response) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
      },
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return accessToken;
  }
}
