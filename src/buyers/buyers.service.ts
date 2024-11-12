import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBuyerInput } from './dto/create-buyer.input';
import { UpdateBuyerInput } from './dto/update-buyer.input';

@Injectable()
export class BuyersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBuyerInput: CreateBuyerInput) {
    return this.prismaService.buyer.create({
      data: {
        name: createBuyerInput.name,
        surname: createBuyerInput.surname,
        email: createBuyerInput.email,
        password: createBuyerInput.password,
      },
    });
  }

  async findAll() {
    return await this.prismaService.buyer.findMany();
  }

  async findOne(id?: number, email?: string) {
    return await this.prismaService.buyer.findFirst({
      where: { id, email },
    });
  }

  async update(id: number, updateBuyerInput: UpdateBuyerInput) {
    return this.prismaService.buyer.update({
      where: { id },
      data: {
        name: updateBuyerInput.name,
        surname: updateBuyerInput.surname,
        email: updateBuyerInput.email,
        password: updateBuyerInput.password,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.buyer.delete({
      where: { id },
    });
  }
}
