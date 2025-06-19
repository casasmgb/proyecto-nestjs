import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados";
import { Pacientes } from "./Pacientes";

@Index("hismed_codificacion_uq", ["hismed_codificacion"], { unique: true })
@Index("historial_medico_pk", ["hismed_id"], { unique: true })
@Entity("historial_medico", { schema: "reservas" })
export class HistorialMedico {
  @PrimaryGeneratedColumn({ type: "integer", name: "hismed_id" })
  hismed_id: number;

  @Column("character varying", { name: "hismed_codificacion", unique: true })
  hismed_codificacion: string;

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

  @ManyToOne(() => Estados, (estados) => estados.historial_medicos)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @OneToMany(() => Pacientes, (pacientes) => pacientes.hismed_)
  pacientes: Pacientes[];
}
