//mockData.ts
export interface User {
    id: number;
    email: string;
    password: string;
    role: 'professor' | 'aluno';
  }
  
  export const mockUsers: User[] = [
    {
      id: 1,
      email: 'cristiano.fuschilo',
      password: 'professor123',
      role: 'professor',
    },
    {
      id: 2,
      email: 'lucas.bhering',
      password: 'aluno123',
      role: 'aluno',
    },
    {
      id: 3,
      email: 'gabriel.gusmao',
      password: 'aluno123',
      role: 'aluno',
    },
    {
      id: 4,
      email: 'pedro.carvalho',
      password: 'aluno123',
      role: 'aluno',
    },
  ];
  