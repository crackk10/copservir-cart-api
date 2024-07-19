import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detalle_factura } from './entities/detalle-factura.entity';
import { Repository } from 'typeorm';
import { ProductoService } from 'src/producto/producto.service';

@Injectable()
export class DetalleFacturaService {

  constructor(
    private readonly productosService : ProductoService,
    @InjectRepository(Detalle_factura) private readonly detalleRepository : Repository<Detalle_factura>){}
 
    async create(createDetalleFacturaDto: CreateDetalleFacturaDto[]): Promise<void> {
      for(const dto of createDetalleFacturaDto) {
        try {
          await this.modificarStock(dto);
        } catch (error) {
          throw new BadRequestException(`Stock insuficiente para el producto con ID ${dto.productoId}`);
        }
      }
      for (const dto of createDetalleFacturaDto) {
        await this.modificarStock(dto); // esperar a que se modifique el stock
        await this.detalleRepository.save(dto); // Guarda el detalle de factura
      }
    }
    
    async modificarStock(data: CreateDetalleFacturaDto): Promise<void> {
      await this.productosService.ajusteStock(data.productoId, data.cantidad); 
    }
    async veriicarStock(data: CreateDetalleFacturaDto): Promise<void> {
      await this.productosService.verStock(data.productoId, data.cantidad); 
    }
    

}
