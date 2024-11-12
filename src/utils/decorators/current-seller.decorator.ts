import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Seller } from '@prisma/client';
import { Request } from 'express';

export const CurrentSeller = createParamDecorator(
  (key: keyof Seller, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
  },
);
