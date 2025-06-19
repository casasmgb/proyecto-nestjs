import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HorariosMedicos } from "./HorariosMedicos";
import { Estados } from "./Estados";
import { Personas } from "./Personas";
import { MedicosEspecialidades } from "./MedicosEspecialidades";

@Index("medico_pk", ["med_id"], { unique: true })
@Entity("medicos", { schema: "reservas" })
export class Medicos {
  @PrimaryGeneratedColumn({ type: "integer", name: "med_id" })
  med_id: number;

  @Column("character varying", {
    name: "med_matricula",
    nullable: true,
    length: 50,
  })
  med_matricula: string | null;

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

  @OneToMany(() => HorariosMedicos, (horarios_medicos) => horarios_medicos.med_)
  horarios_medicos: HorariosMedicos[];

  @ManyToOne(() => Estados, (estados) => estados.medicos)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(() => Personas, (personas) => personas.medicos)
  @JoinColumn([{ name: "per_id", referencedColumnName: "per_id" }])
  per_: Personas;

  @OneToMany(
    () => MedicosEspecialidades,
    (medicos_especialidades) => medicos_especialidades.med_
  )
  medicos_especialidades: MedicosEspecialidades[];
}
