import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshBuyerGuard extends AuthGuard('jwt-refresh-buyer') {}
