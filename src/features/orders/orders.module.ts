import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { ProductsModule } from '../products';
import { Order, OrderItem } from './entities';
import { OrdersController } from './controllers';
import { OrdersService } from './services';

@Module({
  imports: [UsersModule, ProductsModule, TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
