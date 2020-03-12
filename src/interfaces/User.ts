type Gender = 'M' | 'F';
type UserType = 'S' | 'O' | 'D' | 'T' | 'P';

interface UserIdentity {
  idx: number;
  username: string;
  email: string;
  name: string;
  nickname: string;
  gender: Gender;
  userType: UserType;
  birthdate: string;
  phone: string;
  photo: [string, string];
}

export default UserIdentity;
