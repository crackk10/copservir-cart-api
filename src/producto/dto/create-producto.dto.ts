import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator"
import { Estado } from "src/common/enums/estado.enum"

export class CreateProductoDto {
  @IsString()
  nombre: string
  @IsNumber()
  @Min(1)
  precio_base: number
  @IsNumber()
  @Min(1)
  iva:number
  @IsOptional()
  @IsNumber()
  descuento:number
  @IsNumber()
  enStock:number
  @IsString()
  @MaxLength(200)
  descripcion: string
  @IsEnum(Estado)
  estado:string
  @IsString()
  imagen: string
  
}
