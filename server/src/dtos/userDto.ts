import { IUser } from "../models/userModel";

export class UserDto {
  id;
  email;
  isActivated;

  constructor(model: IUser) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
