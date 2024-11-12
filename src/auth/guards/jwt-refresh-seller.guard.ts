import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshSellerGuard extends AuthGuard('jwt-refresh-seller') {}
