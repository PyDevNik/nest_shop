import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessSellerGuard extends AuthGuard('jwt-access-seller') {}
