import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('file')) // Intercepts file upload
  async addProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() productDto: ProductDto,
  ) {
    if (!file) {
      throw new Error('File upload required');
    }

    // Convert file to Base64
    const base64Image = file.buffer.toString('base64');

    // Pass the data to the service
    return this.productsService.createProduct({
      ...productDto,
      image: base64Image, // Save Base64 in database
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}
