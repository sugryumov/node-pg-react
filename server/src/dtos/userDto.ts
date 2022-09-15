export class UserDto {
  id;
  email;
  isActivated;

  constructor(model: any) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
