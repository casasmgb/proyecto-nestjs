import { Estados } from "./Estados";
import { Usuarios } from "./Usuarios";
import { Personas } from "./Personas";
import { Roles } from "./Roles";
import { UsuariosRoles } from "./UsuariosRoles";
import { Medicos } from "./Medicos";
import { Especialidades } from "./Especialidades";
import { MedicosEspecialidades } from "./MedicosEspecialidades";
import { Pacientes } from "./Pacientes";
import { HistorialMedico } from "./HistorialMedico";
import { HorariosMedicos } from "./HorariosMedicos";
import { Horarios } from "./Horarios";
import { Citas } from "./Citas";

const entities = [
  Estados,
  Usuarios,
  Personas,
  Roles,
  UsuariosRoles,
  Medicos,
  Especialidades,
  MedicosEspecialidades,
  Pacientes,
  HistorialMedico,
  HorariosMedicos,
  Horarios,
  Citas,
];

export {
  entities
};
