import { Controller} from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';



@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  /* @Post()
  create(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto[]) {
    return this.detalleFacturaService.create(createDetalleFacturaDto, fa);
  }
 */


}
