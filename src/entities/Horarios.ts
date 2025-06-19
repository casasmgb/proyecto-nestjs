import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Estados } from "./Estados";
import { HorariosMedicos } from "./HorariosMedicos";

@Index("horarios_pk", ["hor_id"], { unique: true })
@Entity("horarios", { schema: "parametricas" })
export class Horarios {
  @Column("smallint", { primary: true, name: "hor_id" })
  hor_id: number;

  @Column("time without time zone", { name: "hor_inicio" })
  hor_inicio: string;

  @Column("time without time zone", { name: "hor_fin" })
  hor_fin: string;

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

  @ManyToOne(() => Estados, (estados) => estados.horarios)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @OneToMany(() => HorariosMedicos, (horarios_medicos) => horarios_medicos.hor_)
  horarios_medicos: HorariosMedicos[];
}
