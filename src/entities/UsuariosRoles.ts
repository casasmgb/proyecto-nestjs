import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estados } from "./Estados";
import { Roles } from "./Roles";
import { Usuarios } from "./Usuarios";

@Index("usuarios_roles_pk", ["usurol_id"], { unique: true })
@Entity("usuarios_roles", { schema: "autenticacion" })
export class UsuariosRoles {
  @PrimaryGeneratedColumn({ type: "integer", name: "usurol_id" })
  usurol_id: number;

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

  @ManyToOne(() => Estados, (estados) => estados.usuarios_roles)
  @JoinColumn([{ name: "est_id", referencedColumnName: "est_id" }])
  est_: Estados;

  @ManyToOne(() => Roles, (roles) => roles.usuarios_roles)
  @JoinColumn([{ name: "rol_id", referencedColumnName: "rol_id" }])
  rol_: Roles;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuarios_roles)
  @JoinColumn([{ name: "usu_id", referencedColumnName: "usu_id" }])
  usu_: Usuarios;
}
