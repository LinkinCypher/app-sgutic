export class CreateUserDto {
    nombres: string;
    apellidos: string;
    usuario: string;
    password: string;
    rol: number;  // El rol se representará como un número
    estado: boolean;
    fecha_nacimiento: Date;
  }
  