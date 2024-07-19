import { Injectable } from '@nestjs/common';
import { CreateContabilidadDto } from './dto/create-contabilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contabilidad } from './entities/contabilidad.entity';
import { Repository } from 'typeorm';
import { Factura } from 'src/factura/entities/factura.entity';

@Injectable()
export class ContabilidadService {
  constructor(

    @InjectRepository(Contabilidad) private readonly contabilidadRepository : Repository<Contabilidad>){}

  async create(createContabilidadDto: CreateContabilidadDto) {
    //const z = await this.ultimoRegistro()
    //const dataActualizada = await this.obtenerFacturasYSumarValores(z.id)
   
    return await  this.contabilidadRepository.save({...createContabilidadDto, fecha : new Date()})
  }

  async ultimoRegistro(): Promise<Contabilidad> {
    const query = this.contabilidadRepository.createQueryBuilder('contabilidad')
      .orderBy('contabilidad.id', 'DESC')
      .limit(1);
    const registro = await query.getOne();
    if (!registro) {
      throw new Error('No se encontró ningún registro contable');
    }
    return registro;
  }


  async getFacturasByContabilidadId(): Promise<Factura[]> {
    const numeroContable = await this.ultimoRegistro()
    if (!numeroContable) {
      throw new Error('Contabilidad no encontrada');
    }
    return numeroContable.factura || [];
  }

  

  async obtenerFacturasYSumarValores(contabilidadId: number): Promise<any> {
    // Obtener la contabilidad con sus facturas asociadas
    const contabilidad = await this.contabilidadRepository.findOne({
      where: { id: contabilidadId },
      relations: ['facturaId'],
    });
    if (!contabilidad) {
      throw new Error('Contabilidad no encontrada');
    }
    const sumas = contabilidad.factura.reduce((acumulador, factura) => {
      return {
        total: acumulador.total + (factura.total || 0),
        total_descuento: acumulador.total_descuento + (factura.total_descuento || 0),
        total_iva: acumulador.total_iva + (factura.total_iva || 0),
        total_neto: acumulador.total_neto + (factura.total_neto || 0),
      };
    }, { total: 0, total_descuento: 0, total_iva: 0, total_neto: 0 });

    return {
      ...sumas,
    };
  }
 
}
