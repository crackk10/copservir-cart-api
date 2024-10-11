import { Column, Entity,  ManyToOne,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoEntrega } from "../enums/tipoEntrega.enum";
import { TipoPago } from "../enums/tipoPago.enum";
import { Detalle_factura } from "src/detalle-factura/entities/detalle-factura.entity";
import { Contabilidad } from "src/contabilidad/entities/contabilidad.entity";


@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: string;
  @Column()
  cliente: string;
  @Column()
  total: number;
  @Column({default:0})
  total_descuento:number
  @Column()
  total_iva: number;
  @Column()
  total_neto: number;
  @Column({type:'enum', enum: TipoPago})
  tipo_pago : TipoPago
  @Column({type:'enum', enum:TipoEntrega})
  tipo_entrega :  TipoEntrega
    // Relacion con detalleFactura
  @OneToMany(()=> Detalle_factura, (detalle)=> detalle.id)
  detalle_Factura: Detalle_factura[]
  
  // Relacion con contabilidad
  @ManyToOne(() => Contabilidad, contabilidad => contabilidad.facturas)
  contabilidad: Contabilidad;
}
