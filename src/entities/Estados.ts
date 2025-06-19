import { Column, Entity, Index, OneToMany } from "typeorm";
import { Citas } from "./Citas";
import { Especialidades } from "./Especialidades";
import { HistorialMedico } from "./HistorialMedico";
import { Horarios } from "./Horarios";
import { HorariosMedicos } from "./HorariosMedicos";
import { Medicos } from "./Medicos";
import { MedicosEspecialidades } from "./MedicosEspecialidades";
import { Pacientes } from "./Pacientes";
import { Personas } from "./Personas";
import { Roles } from "./Roles";
import { Usuarios } from "./Usuarios";
import { UsuariosRoles } from "./UsuariosRoles";

@Index("estados_pk", ["est_id"], { unique: true })
@Entity("estados", { schema: "parametricas" })
export class Estados {
  @Column("smallint", { primary: true, name: "est_id" })
  est_id: number;

  @Column("character varying", { name: "est_nombre" })
  est_nombre: string;

  @Column("character varying", { name: "est_descripcion", nullable: true })
  est_descripcion: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    default: () => "now()",
  })
  fecha_registro: Date;

  @Column("integer", { name: "usuario_registro" })
  usuario_registro: number;

  @OneToMany(() => Citas, (citas) => citas.est_)
  citas: Citas[];

  @OneToMany(() => Especialidades, (especialidades) => especialidades.est_)
  especialidades: Especialidades[];

  @OneToMany(() => HistorialMedico, (historial_medico) => historial_medico.est_)
  historial_medicos: HistorialMedico[];

  @OneToMany(() => Horarios, (horarios) => horarios.est_)
  horarios: Horarios[];

  @OneToMany(() => HorariosMedicos, (horarios_medicos) => horarios_medicos.est_)
  horarios_medicos: HorariosMedicos[];

  @OneToMany(() => Medicos, (medicos) => medicos.est_)
  medicos: Medicos[];

  @OneToMany(
    () => MedicosEspecialidades,
    (medicos_especialidades) => medicos_especialidades.est_
  )
  medicos_especialidades: MedicosEspecialidades[];

  @OneToMany(() => Pacientes, (pacientes) => pacientes.est_)
  pacientes: Pacientes[];

  @OneToMany(() => Personas, (personas) => personas.est_)
  personas: Personas[];

  @OneToMany(() => Roles, (roles) => roles.est_)
  roles: Roles[];

  @OneToMany(() => Usuarios, (usuarios) => usuarios.est_)
  usuarios: Usuarios[];

  @OneToMany(() => UsuariosRoles, (usuarios_roles) => usuarios_roles.est_)
  usuarios_roles: UsuariosRoles[];
}
