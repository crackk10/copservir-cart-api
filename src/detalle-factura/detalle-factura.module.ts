import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaController } from './detalle-factura.controller';
import { ProductoModule } from 'src/producto/producto.module';
import { ProductoService } from 'src/producto/producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_factura } from './entities/detalle-factura.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Detalle_factura]), ProductoModule],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService, ProductoService],
  exports:[TypeOrmModule, DetalleFacturaService]
})
export class DetalleFacturaModule {}
