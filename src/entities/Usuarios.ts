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
import { Personas } from "./Personas";
import { UsuariosRoles } from "./UsuariosRoles";

@Index("usuarios_pk", ["usu_id"], { unique: true })
@Index("usu_usuario_uq", ["usu_usuario"], { unique: true })
@Entity("usuarios", { schema: "autenticacion" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "usu_id" })
  usu_id: number;

  @Column("character varying", {
    name: "usu_usuario",
    unique: true,
    length: 50,
  })
  usu_usuario: string;

  @Column("character varying", { name: "usu_password" })
  usu_password: string;

  @Column("date", { name: "usu_fecha_vigencia", nullable: true })
  usu_fecha_vigencia: string | null;

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

  @ManyToOne(() => Estados, (estados) => estados.usuarios)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(() => Personas, (personas) => personas.usuarios)
  @JoinColumn([{ name: "per_id", referencedColumnName: "per_id" }])
  per_: Personas;

  @OneToMany(() => UsuariosRoles, (usuarios_roles) => usuarios_roles.usu_)
  usuarios_roles: UsuariosRoles[];
}
