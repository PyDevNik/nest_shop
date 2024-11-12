import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Buyer } from '@prisma/client';
import { Request } from 'express';

export const CurrentBuyer = createParamDecorator(
  (key: keyof Buyer, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
  },
);
