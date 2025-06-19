import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Medicos } from "./Medicos";
import { Pacientes } from "./Pacientes";
import { Estados } from "./Estados";
import { Usuarios } from "./Usuarios";

@Index("persona_pk", ["per_id"], { unique: true })
@Entity("personas", { schema: "reservas" })
export class Personas {
  @PrimaryGeneratedColumn({ type: "integer", name: "per_id" })
  per_id: number;

  @Column("character varying", { name: "per_nombre_completo", length: 300 })
  per_nombre_completo: string;

  @Column("character varying", { name: "per_documento_identidad" })
  per_documento_identidad: string;

  @Column("date", { name: "per_fecha_nacimiento", nullable: true })
  per_fecha_nacimiento: string | null;

  @Column("character varying", {
    name: "per_telefono",
    nullable: true,
    length: 50,
  })
  per_telefono: string | null;

  @Column("character varying", {
    name: "per_correo",
    nullable: true,
    length: 50,
  })
  per_correo: string | null;

  @Column("character varying", {
    name: "per_direccion",
    nullable: true,
    length: 100,
  })
  per_direccion: string | null;

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

  @OneToMany(() => Medicos, (medicos) => medicos.per_)
  medicos: Medicos[];

  @OneToMany(() => Pacientes, (pacientes) => pacientes.per_)
  pacientes: Pacientes[];

  @ManyToOne(() => Estados, (estados) => estados.personas)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.per_)
  usuarios: Usuarios[];
}
