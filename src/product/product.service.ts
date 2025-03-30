import { Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(productData: ProductDto & { image: string }) {
    return this.prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        category: productData.category,
        image: productData.image, // Save Base64 in database
      },
    });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
