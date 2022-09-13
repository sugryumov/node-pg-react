export interface IUserDto {
  id: string;
  email: string;
  isActivated: boolean;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}
