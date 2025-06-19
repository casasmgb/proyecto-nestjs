import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Citas } from "./Citas";
import { Estados } from "./Estados";
import { Horarios } from "./Horarios";
import { Medicos } from "./Medicos";

@Index("horarios_medicos_pk", ["hormed_id"], { unique: true })
@Entity("horarios_medicos", { schema: "reservas" })
export class HorariosMedicos {
  @PrimaryGeneratedColumn({ type: "integer", name: "hormed_id" })
  hormed_id: number;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    default: () => "now()",
  })
  fecha_registro: Date;

  @Column("timestamp without time zone", {
    name: "fecha_modificacion",
    nullable: true,
  })
  fecha_modificacion: Date | null;

  @Column("timestamp without time zone", {
    name: "fecha_eliminacion",
    nullable: true,
  })
  fecha_eliminacion: Date | null;

  @Column("integer", { name: "usuario_registro" })
  usuario_registro: number;

  @Column("integer", { name: "usuario_modificacion", nullable: true })
  usuario_modificacion: number | null;

  @Column("integer", { name: "usuario_eliminacion", nullable: true })
  usuario_eliminacion: number | null;

  @OneToMany(() => Citas, (citas) => citas.hormed_)
  citas: Citas[];

  @ManyToOne(() => Estados, (estados) => estados.horarios_medicos)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(() => Horarios, (horarios) => horarios.horarios_medicos)
  @JoinColumn([{ name: "hor_id", referencedColumnName: "hor_id" }])
  hor_: Horarios;

  @ManyToOne(() => Medicos, (medicos) => medicos.horarios_medicos)
  @JoinColumn([{ name: "med_id", referencedColumnName: "med_id" }])
  med_: Medicos;
}
