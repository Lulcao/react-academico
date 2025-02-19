export interface User {
  id: number;
  email: string;
  nome: string;
  sobrenome: string;
  password: string;
  periodo: number;
  role: 'professor' | 'aluno';
}

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'cristiano.fuschilo',
    password: 'professor123',
    role: 'professor',
    nome: 'Cristiano',
    sobrenome: 'Fuschilo',
    periodo: 7
  },
  {
    id: 2,
    email: 'lucas.bhering',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Lucas',
    sobrenome: 'Bhering',
    periodo: 7
  },
  {
    id: 3,
    email: 'gabriel.gusmao',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Gabriel',
    sobrenome: 'Gusmão',
    periodo: 7
  },
  {
    id: 4,
    email: 'pedro.carvalho',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Pedro',
    sobrenome: 'Carvalho',
    periodo: 7
  },
  {
    id: 5,
    email: 'maria.silva',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Maria',
    sobrenome: 'Silva',
    periodo: 7
  },
  {
    id: 6,
    email: 'joao.santos',
    password: 'aluno123',
    role: 'aluno',
    nome: 'João',
    sobrenome: 'Santos',
    periodo: 7
  },
  {
    id: 7,
    email: 'ana.oliveira',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Ana',
    sobrenome: 'Oliveira',
    periodo: 7
  },
  {
    id: 8,
    email: 'arthur.jose',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Arthur',
    sobrenome: 'Jose',
    periodo: 7
  },
  {
    id: 9,
    email: 'juliana.rodrigues',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Juliana',
    sobrenome: 'Rodrigues',
    periodo: 7
  },
  {
    id: 10,
    email: 'gabriel.ferreira',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Gabriel',
    sobrenome: 'Ferreira',
    periodo: 7
  },
  {
    id: 11,
    email: 'beatriz.alves',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Beatriz',
    sobrenome: 'Alves',
    periodo: 7
  },
  {
    id: 12,
    email: 'rafael.pereira',
    password: 'aluno123',
    role: 'aluno',
    nome: 'Rafael',
    sobrenome: 'Pereira',
    periodo: 7
  }
];
