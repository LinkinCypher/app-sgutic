export class CreateUserDto {
    nombres: string;
    apellidos: string;
    usuario: string;
    password: string;
    rol: number;  // El rol se representará como un número (1 para Admin, 2 para Gestor, etc.)
    estado: boolean;
    fecha_nacimiento: Date;
  }
  