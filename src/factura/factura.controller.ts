import { Controller,Post, Body } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaRequestDto } from 'src/common/dto/facturaRequestDto';


@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  create(@Body() facturaRequestDto: FacturaRequestDto) {  
    return this.facturaService.create(facturaRequestDto);
  }

 
}
