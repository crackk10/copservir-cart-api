import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { ProductoModule } from './producto/producto.module';
import { FacturaModule } from './factura/factura.module';
import { ContabilidadModule } from './contabilidad/contabilidad.module';



@Module({
  imports: [
    FacturaModule,
    ProductoModule,
    DetalleFacturaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Clave123',
      database: 'copservir',
      autoLoadEntities: true,
      synchronize: true, //Necesario para que se creen las tablas en la BD si no existen
    }),
    
    ContabilidadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
