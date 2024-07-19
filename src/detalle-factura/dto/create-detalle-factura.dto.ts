import { IsNumber } from "class-validator";

export class CreateDetalleFacturaDto {
  @IsNumber()
  productoId: number;
  @IsNumber()
  cantidad: number;
  @IsNumber()
  iva_facturado:number
  @IsNumber()
  descuento_facturado:number
  @IsNumber()
  facturaId: number;
}
