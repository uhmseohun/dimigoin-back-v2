type gender = 'M' | 'F';
type user_type = 'S' | 'O' | 'D' | 'T' | 'P';

export interface Account {
  username: string;
  password: string;
}

export interface UserIdentity {
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
