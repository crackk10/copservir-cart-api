import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Contabilidad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  fecha:  Date
  @OneToMany(()=> Factura, (factura)=> factura.id)//este no puede existir sin un ManyToOne en la otra tabla
  factura: Factura[]  | null
  @Column({default : 0})
  total:number | null
  @Column({default : 0})
  total_descuento:number | null
  @Column({default : 0})
  total_iva:number | null
  @Column({default : 0})
  total_neto:number | null
}
