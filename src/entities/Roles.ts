import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Estados } from "./Estados";
import { UsuariosRoles } from "./UsuariosRoles";

@Index("roles_pk", ["rol_id"], { unique: true })
@Entity("roles", { schema: "autenticacion" })
export class Roles {
  @Column("integer", { primary: true, name: "rol_id" })
  rol_id: number;

  @Column("character varying", { name: "rol_nombre" })
  rol_nombre: string;

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

  @ManyToOne(() => Estados, (estados) => estados.roles)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @OneToMany(() => UsuariosRoles, (usuarios_roles) => usuarios_roles.rol_)
  usuarios_roles: UsuariosRoles[];
}
