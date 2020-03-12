type gender = 'M' | 'F';
type user_type = 'S' | 'O' | 'D' | 'T' | 'P';

export interface IAccount {
  username: string;
  password: string;
}

export interface IUserIdentity {
  id: number;
  username: string;
  email: string;
  name: string;
  nick: string;
  gender: gender;
  user_type: user_type;
  birthdate: string;
  phone: string;
  photofile1: string;
  photofile2: string;
}
