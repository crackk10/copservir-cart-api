import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContabilidadDto } from './dto/create-contabilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contabilidad } from './entities/contabilidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContabilidadService {
  constructor(
    @InjectRepository(Contabilidad)
    private readonly contabilidadRepository: Repository<Contabilidad>,
  ) {}

  async create(createContabilidadDto: CreateContabilidadDto) {
    return await this.contabilidadRepository.save({
      ...createContabilidadDto,
      fecha: new Date(),
    });
  }

  async ultimoRegistro(): Promise<Contabilidad> {
    const query = this.contabilidadRepository
      .createQueryBuilder('contabilidad')
      .orderBy('contabilidad.id', 'DESC')
      .limit(1);
    const registro = await query.getOne();
    if (!registro) {
      throw new BadRequestException('No se encontró ningún registro contable');
    }
    return registro;
  }

  async getFacturasHoy(): Promise<Contabilidad> {
    const contabilidadActual = await this.contabilidadDeHoy();
    const contabilidadActualziada =await this.actualizarTotales(contabilidadActual);
    return await this.contabilidadRepository.save(contabilidadActualziada);
  }

  private async contabilidadDeHoy(): Promise<Contabilidad> {
    const contabilidadActual = await this.ultimoRegistro();
    const contabilidadConFacturas = await this.contabilidadRepository.findOne({
      where: { id: contabilidadActual.id },
      relations: ['facturas'],
    });
    if (!contabilidadConFacturas) {
      throw new BadRequestException('No se encontró ningún registro contable');
    }
    return contabilidadConFacturas;
  }

  private async actualizarTotales(contabilidad: Contabilidad): Promise<Contabilidad> {
    const resultado = await this.sumarTotalesEnFacturas(contabilidad);
    contabilidad.total = resultado.total;
    contabilidad.total_descuento = resultado.total_descuento;
    contabilidad.total_iva = resultado.total_iva;
    contabilidad.total_neto = resultado.total_neto;
    return contabilidad;
  }

  private async sumarTotalesEnFacturas(contabilidad: Contabilidad): Promise<Contabilidad> {
    const resultado = await contabilidad.facturas.reduce(
      (acumulador, factura) => {
        return {
          total: acumulador.total + (factura.total || 0),
          total_descuento:
            acumulador.total_descuento + (factura.total_descuento || 0),
          total_iva: acumulador.total_iva + (factura.total_iva || 0),
          total_neto: acumulador.total_neto + (factura.total_neto || 0),
        };
      },
      { total: 0, total_descuento: 0, total_iva: 0, total_neto: 0 },
    );

    return {
      ...resultado,
      id: contabilidad.id,
      fecha: contabilidad.fecha,
      facturas: contabilidad.facturas,
    };
  }
}
