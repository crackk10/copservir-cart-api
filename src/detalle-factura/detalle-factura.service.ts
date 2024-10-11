import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detalle_factura } from './entities/detalle-factura.entity';
import { Repository } from 'typeorm';
import { ProductoService } from 'src/producto/producto.service';
import { Producto } from 'src/producto/entities/producto.entity';
import { Factura } from 'src/factura/entities/factura.entity';


@Injectable()
export class DetalleFacturaService {

  constructor(
    private readonly productosService : ProductoService,
    @InjectRepository(Detalle_factura) private readonly detalleRepository : Repository<Detalle_factura>){}
 
    async create(createDetalleFacturaDto: CreateDetalleFacturaDto[], factura: Factura): Promise<void> {
      let producto 
      //await this.veriicarStock(createDetalleFacturaDto)
      //si no hay errores modifico el stock y guardo 
      for (const dto of createDetalleFacturaDto) {
        producto = await this.modificarStock(dto); 
        await this.detalleRepository.save({...dto, producto, factura}); 
      }
    }
    
    async veriicarStock(data: CreateDetalleFacturaDto[]): Promise<void> {
      for(const dto of data) {
        try {
          await this.productosService.inStock(dto.productoId, dto.cantidad);
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }

    private async modificarStock(data: CreateDetalleFacturaDto): Promise<Producto> {
      return await this.productosService.ajusteStock(data.productoId, data.cantidad); 
    }

    
}
