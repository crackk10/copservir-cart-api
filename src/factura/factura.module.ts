import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { ContabilidadModule } from 'src/contabilidad/contabilidad.module';
import { ContabilidadService } from 'src/contabilidad/contabilidad.service';

@Module({
  imports:[TypeOrmModule.forFeature([Factura]),ContabilidadModule ],
  controllers: [FacturaController],
  providers: [FacturaService,ContabilidadService],
  exports:[TypeOrmModule]//importante para relación con detalle_factura
})
export class FacturaModule {}
