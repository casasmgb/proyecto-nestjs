import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados";
import { HorariosMedicos } from "./HorariosMedicos";
import { Pacientes } from "./Pacientes";

@Index("horario_atencion_medicio_uq", ["cit_fecha", "hormed_id"], {
  unique: true,
})
@Index("paciente_atencion_uq", ["cit_fecha", "hormed_id", "pac_id"], {
  unique: true,
})
@Index("citas_pk", ["cit_id"], { unique: true })
@Entity("citas", { schema: "reservas" })
export class Citas {
  @PrimaryGeneratedColumn({ type: "integer", name: "cit_id" })
  cit_id: number;

  @Column("integer", { name: "pac_id", unique: true })
  pac_id: number;

  @Column("integer", { name: "hormed_id" })
  hormed_id: number;

  @Column("date", { name: "cit_fecha" })
  cit_fecha: string;

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

  @ManyToOne(() => Estados, (estados) => estados.citas)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(
    () => HorariosMedicos,
    (horarios_medicos) => horarios_medicos.citas
  )
  @JoinColumn([{ name: "hormed_id", referencedColumnName: "hormed_id" }])
  hormed_: HorariosMedicos;

  @ManyToOne(() => Pacientes, (pacientes) => pacientes.citas)
  @JoinColumn([{ name: "pac_id", referencedColumnName: "pac_id" }])
  pac_: Pacientes;
}
