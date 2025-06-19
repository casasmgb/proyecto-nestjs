import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Estados } from "./Estados";
import { MedicosEspecialidades } from "./MedicosEspecialidades";

@Index("especialidad_pk", ["esp_id"], { unique: true })
@Entity("especialidades", { schema: "parametricas" })
export class Especialidades {
  @Column("smallint", { primary: true, name: "esp_id" })
  esp_id: number;

  @Column("character varying", { name: "esp_nombre", length: 200 })
  esp_nombre: string;

  @Column("character varying", { name: "esp_observacion", nullable: true })
  esp_observacion: string | null;

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

  @ManyToOne(() => Estados, (estados) => estados.especialidades)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @OneToMany(
    () => MedicosEspecialidades,
    (medicos_especialidades) => medicos_especialidades.esp_
  )
  medicos_especialidades: MedicosEspecialidades[];
}
