import { Controller,  Post, Body } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';


@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  @Post()
  create(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto[]) {
    return this.detalleFacturaService.create(createDetalleFacturaDto);
  }



}
