import { Estado } from 'src/common/enums/estado.enum';
import { Detalle_factura } from 'src/detalle-factura/entities/detalle-factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nombre: string;
  @Column({ nullable: false })
  precio_base: number;
  @Column({ nullable: false })
  iva: number;
  @Column({ nullable: true })
  descuento: number;
  @Column({ nullable: true })
  enStock: number;
  @Column({ nullable: true })
  descripcion: string;
  @Column({ type: 'enum', default: Estado.ACTIVO, enum: Estado })
  estado: string;
  @Column()
  imagen: string;
  // Relacion con detalleFactura
  @OneToMany(() => Detalle_factura, (detalle) => detalle.producto)
  detalle_Factura: Detalle_factura[];
}
