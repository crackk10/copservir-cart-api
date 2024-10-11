import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFacturaDto } from 'src/factura/dto/create-factura.dto';
import { CreateDetalleFacturaDto } from 'src/detalle-factura/dto/create-detalle-factura.dto';


export class FacturaRequestDto {
  @ValidateNested()
  @Type(() => CreateFacturaDto)
  factura: CreateFacturaDto;

  @IsArray()
  @ArrayNotEmpty({message : 'No hay productos en el carrito'})
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleFacturaDto)
  detalleFactura: CreateDetalleFacturaDto[];
}