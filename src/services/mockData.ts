//mockData.ts
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
      periodo: 0
    },
    {
      id: 2,
      email: 'lucas.bhering',
      password: 'aluno123',
      role: 'aluno',
      nome: 'Lucas',
      sobrenome: 'Bhering',
      periodo: 1
    },
    {
      id: 3,
      email: 'gabriel.gusmao',
      password: 'aluno123',
      role: 'aluno',
      nome: 'Gabriel',
      sobrenome: 'Gusmão',
      periodo: 8
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
      email: 'a',
      password: 'a',
      role: 'aluno',
      nome: 'A',
      sobrenome: 'A',
      periodo: 10
    },
  ];
  