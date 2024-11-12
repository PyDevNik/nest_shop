import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalBuyerGuard extends AuthGuard('local-buyer') {}
