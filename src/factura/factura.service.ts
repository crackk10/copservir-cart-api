import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { ContabilidadService } from 'src/contabilidad/contabilidad.service';
import { Contabilidad } from 'src/contabilidad/entities/contabilidad.entity';


@Injectable()
export class FacturaService {
  constructor(
    private readonly contabilidadService : ContabilidadService,
    @InjectRepository(Factura) private readonly facturaRepository : Repository<Factura>
    ){}
    
    async create(createFacturaDto: CreateFacturaDto) {
      const numeroContable = await this.traerNumeroContable();
      if (!numeroContable) {
        throw new Error('No se pudo obtener el número contable');
      }
      const factura = this.facturaRepository.create({
        ...createFacturaDto,
        contabilidad: numeroContable,
      });
      return await this.facturaRepository.save(factura);
    }
  
    private async traerNumeroContable(): Promise<Contabilidad> {
      return await this.contabilidadService.ultimoRegistro();
    }
}
