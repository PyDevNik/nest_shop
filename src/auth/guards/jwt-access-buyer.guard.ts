import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessBuyerGuard extends AuthGuard('jwt-access-buyer') {}
