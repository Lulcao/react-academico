export interface User {
    id: number;
    email: string;
    password: string;
    role: 'professor' | 'aluno';
  }
  
  export const mockUsers: User[] = [
    {
      id: 1,
      email: 'c.fuschilo@cefet-rj.br',
      password: 'professor123',
      role: 'professor',
    },
    {
      id: 2,
      email: 'l.bhering@cefet-rj.br',
      password: 'aluno123',
      role: 'aluno',
    },
  ];
  