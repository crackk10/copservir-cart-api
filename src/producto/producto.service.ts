import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  
  constructor(@InjectRepository(Producto) private readonly productoRepository : Repository<Producto>){}
  
  async create(createProductoDto: CreateProductoDto) {
    return await this.productoRepository.save(createProductoDto)
  }

  async findAll() {
    return await this.productoRepository.find()
  }

  async ajusteStock(id: number, cantidad: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (producto) {
      producto.enStock = producto.enStock - cantidad;
      await this.productoRepository.save(producto); 
    }
    return producto
  }

  async inStock(id: number, cantidad: number): Promise<void> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    if (producto.enStock < cantidad) {    // Verificar si hay suficiente stock
      throw new BadRequestException(`Hay ${producto.enStock} unidades de ${producto.nombre} y usted solicitó ${cantidad}`);
    }
  }
}
