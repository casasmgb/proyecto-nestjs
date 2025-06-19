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
import { HistorialMedico } from "./HistorialMedico";
import { Personas } from "./Personas";

@Index("pacientes_pk", ["pac_id"], { unique: true })
@Entity("pacientes", { schema: "reservas" })
export class Pacientes {
  @PrimaryGeneratedColumn({ type: "integer", name: "pac_id" })
  pac_id: number;

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

  @OneToMany(() => Citas, (citas) => citas.pac_)
  citas: Citas[];

  @ManyToOne(() => Estados, (estados) => estados.pacientes)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(
    () => HistorialMedico,
    (historial_medico) => historial_medico.pacientes
  )
  @JoinColumn([{ name: "hismed_id", referencedColumnName: "hismed_id" }])
  hismed_: HistorialMedico;

  @ManyToOne(() => Personas, (personas) => personas.pacientes)
  @JoinColumn([{ name: "per_id", referencedColumnName: "per_id" }])
  per_: Personas;
}
