export class ExerciseListDto {
  id;
  title;
  img;

  constructor(model: any) {
    this.id = model.id;
    this.title = model.title;
    this.img = model.img;
  }
}
