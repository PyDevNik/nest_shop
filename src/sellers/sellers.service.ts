import { Injectable } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SellersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSellerInput: CreateSellerInput) {
    return await this.prismaService.seller.create({
      data: {
        name: createSellerInput.name,
        surname: createSellerInput.surname,
        email: createSellerInput.email,
        password: createSellerInput.password,
      },
    });
  }

  async findAll() {
    return await this.prismaService.seller.findMany();
  }

  async findOne(id?: number, email?: string) {
    return await this.prismaService.seller.findFirst({
      where: { id, email },
    });
  }

  async update(id: number, updateSellerInput: UpdateSellerInput) {
    return await this.prismaService.seller.update({
      where: { id },
      data: {
        name: updateSellerInput.name,
        surname: updateSellerInput.surname,
        email: updateSellerInput.email,
        password: updateSellerInput.password,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.seller.delete({
      where: { id },
    });
  }
}
