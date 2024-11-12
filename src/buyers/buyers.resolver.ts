import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BuyersService } from './buyers.service';
import { Buyer } from './entities/buyer.entity';
import { CreateBuyerInput } from './dto/create-buyer.input';
import { UpdateBuyerInput } from './dto/update-buyer.input';

@Resolver(() => Buyer)
export class BuyersResolver {
  constructor(private readonly buyersService: BuyersService) {}

  @Mutation(() => Buyer)
  createBuyer(@Args('createBuyerInput') createBuyerInput: CreateBuyerInput) {
    return this.buyersService.create(createBuyerInput);
  }

  @Query(() => [Buyer], { name: 'buyers' })
  findAll() {
    return this.buyersService.findAll();
  }

  @Query(() => Buyer, { name: 'buyer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.buyersService.findOne(id);
  }

  @Mutation(() => Buyer)
  updateBuyer(@Args('updateBuyerInput') updateBuyerInput: UpdateBuyerInput) {
    return this.buyersService.update(updateBuyerInput.id, updateBuyerInput);
  }

  @Mutation(() => Buyer)
  removeBuyer(@Args('id', { type: () => Int }) id: number) {
    return this.buyersService.remove(id);
  }
}
