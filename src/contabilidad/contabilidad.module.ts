import { Module } from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import { ContabilidadController } from './contabilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contabilidad } from './entities/contabilidad.entity';
import { Factura } from 'src/factura/entities/factura.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Contabilidad,Factura])], 
  controllers: [ContabilidadController],
  providers: [ContabilidadService],
  exports: [ContabilidadService,TypeOrmModule ]
})
export class ContabilidadModule {}
