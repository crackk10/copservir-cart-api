import { Controller, Post, Body, Get, } from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import { CreateContabilidadDto } from './dto/create-contabilidad.dto';


@Controller('contabilidad')
export class ContabilidadController {
  constructor(private readonly contabilidadService: ContabilidadService) {}

  @Post()
  create(@Body() createContabilidadDto: CreateContabilidadDto) {
    return this.contabilidadService.create(createContabilidadDto);
  }
  
@Get()
getFacturasHoy(){
  return this.contabilidadService.getFacturasHoy()
}
@Get('/totales')
getTotalesHoy(){
  //return this.contabilidadService.getTotalesHoy()
}


}
