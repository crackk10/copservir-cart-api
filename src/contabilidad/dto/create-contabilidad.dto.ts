import {  IsNumber,  IsOptional,  } from "class-validator";

export class CreateContabilidadDto {
  @IsOptional()
  @IsNumber()
  facturaId: number  | null
  @IsOptional()
  @IsNumber()
  total:number | null
  @IsOptional()
  @IsNumber()
  total_descuento:number | null
  @IsOptional()
  @IsNumber()
  total_iva:number | null
  @IsOptional()
  @IsNumber()
  total_neto:number | null
}
