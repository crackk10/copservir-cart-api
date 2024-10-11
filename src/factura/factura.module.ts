import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { ContabilidadModule } from 'src/contabilidad/contabilidad.module';
import { ContabilidadService } from 'src/contabilidad/contabilidad.service';
import { DetalleFacturaModule } from 'src/detalle-factura/detalle-factura.module';
import { DetalleFacturaService } from 'src/detalle-factura/detalle-factura.service';
import { ProductoModule } from 'src/producto/producto.module';
import { ProductoService } from 'src/producto/producto.service';

@Module({
  imports:[TypeOrmModule.forFeature([Factura]),ContabilidadModule, DetalleFacturaModule, ProductoModule ],
  controllers: [FacturaController],
  providers: [FacturaService,ContabilidadService, DetalleFacturaService, ProductoService],
  exports:[TypeOrmModule]//importante para relación con detalle_factura
})
export class FacturaModule {}
