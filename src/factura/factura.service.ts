import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { ContabilidadService } from 'src/contabilidad/contabilidad.service';
import { Contabilidad } from 'src/contabilidad/entities/contabilidad.entity';
import { FacturaRequestDto } from 'src/common/dto/facturaRequestDto';
import { DetalleFacturaService } from 'src/detalle-factura/detalle-factura.service';
import { ProductoService } from 'src/producto/producto.service';
import { CreateDetalleFacturaDto } from 'src/detalle-factura/dto/create-detalle-factura.dto';


@Injectable()
export class FacturaService {
  constructor(
    private readonly contabilidadService : ContabilidadService,
    private readonly detalleFacturaService : DetalleFacturaService,
    private readonly productoService : ProductoService,
    @InjectRepository(Factura) private readonly facturaRepository : Repository<Factura>
    ){}
    
    async create({factura, detalleFactura}: FacturaRequestDto) {
      await this.veriicarStock(detalleFactura)
      const contabilidad = await this.traerNumeroContable();
      const facturaRegistrada = await this.facturaRepository.save({
        ...factura,
        contabilidad,
      });
      await this.detalleFacturaService.create(detalleFactura, facturaRegistrada)
      return facturaRegistrada
    }
  
    private async traerNumeroContable(): Promise<Contabilidad> {
      const contabilidad = await this.contabilidadService.ultimoRegistro();
      if (!contabilidad) {
        throw new BadRequestException('No se pudo obtener el número contable');
      }
      return contabilidad
    }
    
    private async veriicarStock(data: CreateDetalleFacturaDto[]): Promise<void> {
      await this.detalleFacturaService.veriicarStock(data); 
    }
}
