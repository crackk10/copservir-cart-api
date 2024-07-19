import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaController } from './detalle-factura.controller';
import { ProductoModule } from 'src/producto/producto.module';
import { FacturaModule } from 'src/factura/factura.module';
import { ProductoService } from 'src/producto/producto.service';
import { FacturaService } from 'src/factura/factura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_factura } from './entities/detalle-factura.entity';
import { ContabilidadModule } from 'src/contabilidad/contabilidad.module';
import { ContabilidadService } from 'src/contabilidad/contabilidad.service';


@Module({
  imports:[TypeOrmModule.forFeature([Detalle_factura]), ProductoModule, FacturaModule, ContabilidadModule],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService, ProductoService, FacturaService, ContabilidadService],
})
export class DetalleFacturaModule {}
