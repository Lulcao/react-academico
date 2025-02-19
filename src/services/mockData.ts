export interface User {
  email: string;
  password: string;
  role: 'professor' | 'aluno';
}

export const mockUsers: User[] = [
  {
    email: 'cristiano.fuschilo',
    password: 'professor123',
    role: 'professor'
  },
  {
    email: 'lucas.bhering',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'gabriel.gusmao',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'pedro.carvalho',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'maria.silva',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'joao.santos',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'ana.oliveira',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'arthur.jose',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'juliana.rodrigues',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'gabriel.ferreira',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'beatriz.alves',
    password: 'aluno123',
    role: 'aluno'
  },
  {
    email: 'rafael.pereira',
    password: 'aluno123',
    role: 'aluno'
  }
];
