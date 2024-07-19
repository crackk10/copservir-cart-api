import {  IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoEntrega } from "../enums/tipoEntrega.enum";
import { TipoPago } from "../enums/tipoPago.enum";

export class CreateFacturaDto {
  @IsOptional()
  @IsNumber()
  contabilidadId:number
  @IsString()
  fecha: string;
  @IsString()
  cliente: string;
  @IsNumber()
  total: number;
  @IsNumber()
  total_descuento:number
  @IsNumber()
  total_iva: number;
  @IsNumber()
  total_neto: number;
  @IsEnum(TipoPago)
  tipo_pago : TipoPago
  @IsEnum(TipoEntrega)
  tipo_entrega :  TipoEntrega
}
