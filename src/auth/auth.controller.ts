import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dtos/register.dto';
import { CurrentSeller } from 'src/utils/decorators/current-seller.decorator';
import { CurrentBuyer } from 'src/utils/decorators/current-buyer.decorator';
import { LocalSellerGuard } from './guards/local-seller.guard';
import { LocalBuyerGuard } from './guards/local-buyer.guard';
import { JwtRefreshSellerGuard } from './guards/jwt-refresh-seller.guard';
import { JwtRefreshBuyerGuard } from './guards/jwt-refresh-buyer.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.register(dto, res);
  }

  @UseGuards(LocalSellerGuard)
  @Post('login/seller')
  async loginSeller(
    @CurrentSeller('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.generateTokens(userId, res);
  }

  @UseGuards(LocalBuyerGuard)
  @Post('login/buyer')
  async loginBuyer(
    @CurrentBuyer('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.generateTokens(userId, res);
  }

  @UseGuards(JwtRefreshSellerGuard)
  @Post('refresh/seller')
  async refreshSeller(
    @CurrentSeller('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.generateTokens(userId, res);
  }

  @UseGuards(JwtRefreshBuyerGuard)
  @Post('refresh/buyer')
  async refreshBuyer(
    @CurrentBuyer('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.generateTokens(userId, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('refresh_token', '');
  }
}
