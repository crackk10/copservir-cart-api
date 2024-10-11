import { Factura } from "src/factura/entities/factura.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Detalle_factura {
  @PrimaryGeneratedColumn()
  id:number
  @ManyToOne(() => Producto, (producto) => producto.detalle_Factura,{})
  producto: Producto;
  @Column()
  cantidad: number;
  @Column()
  iva_facturado:number
  @Column()
  descuento_facturado:number
  @ManyToOne(()=> Factura, (factura)=>factura.id,{})
  factura: Factura;
}
