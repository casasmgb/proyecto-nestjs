import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialidades } from "./Especialidades";
import { Estados } from "./Estados";
import { Medicos } from "./Medicos";

@Index("medicos_especialidades_pk", ["medesp_id"], { unique: true })
@Entity("medicos_especialidades", { schema: "reservas" })
export class MedicosEspecialidades {
  @PrimaryGeneratedColumn({ type: "integer", name: "medesp_id" })
  medesp_id: number;

  @Column("character varying", { name: "medesp_observacion", nullable: true })
  medesp_observacion: string | null;

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

  @ManyToOne(
    () => Especialidades,
    (especialidades) => especialidades.medicos_especialidades
  )
  @JoinColumn([{ name: "esp_id", referencedColumnName: "esp_id" }])
  esp_: Especialidades;

  @ManyToOne(() => Estados, (estados) => estados.medicos_especialidades)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(() => Medicos, (medicos) => medicos.medicos_especialidades)
  @JoinColumn([{ name: "med_id", referencedColumnName: "med_id" }])
  med_: Medicos;
}
